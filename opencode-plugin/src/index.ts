import { getConfig, getKeywordPatterns, isConfigured } from "./config.js";
import { createMem0ApiClient } from "./services/api.js";
import { fetchMemoriesByCategory } from "./services/context.js";
import { stripPrivateContent, isFullyPrivate } from "./services/privacy.js";
import { log, logError } from "./services/logger.js";

const CODE_BLOCK_PATTERN = /```[\s\S]*?```/g;
const INLINE_CODE_PATTERN = /`[^`]+`/g;

const MEMORY_NUDGE_MESSAGE = `[MEMORY TRIGGER DETECTED]
The user wants you to remember something. You MUST use the \`mem0\` tool with \`mode: "add"\` to save this information.

Extract the key information the user wants remembered and save it as a concise, searchable memory.
- Use \`metadata.category\` appropriately: "basicInfos", "project", "frontend", etc.

DO NOT skip this step. The user explicitly asked you to remember.`;

function removeCodeBlocks(text: string): string {
  return text.replace(CODE_BLOCK_PATTERN, "").replace(INLINE_CODE_PATTERN, "");
}

function detectMemoryKeyword(text: string, keywordPatterns: string[]): boolean {
  const textWithoutCode = removeCodeBlocks(text);
  const pattern = new RegExp(`\\b(${keywordPatterns.join("|")})\\b`, "i");
  return pattern.test(textWithoutCode);
}

interface Part {
  id: string;
  sessionID: string;
  messageID: string;
  type: "text";
  text: string;
  synthetic?: boolean;
}

interface ChatMessageInput {
  sessionID: string;
  message: {
    id: string;
  };
}

interface ChatMessageOutput {
  parts: Part[];
}

function formatMemoriesByCategory(
  memoriesByCategory: Map<string, { id: string; memory: string; score?: number; metadata?: Record<string, unknown>; created_at?: string }[]>
): string {
  const parts: string[] = [];

  memoriesByCategory.forEach((memories, category) => {
    if (memories.length === 0) return;

    parts.push(`[MEMORY - ${category}]`);

    memories.forEach((mem) => {
      const score = mem.score !== undefined ? Math.round(mem.score * 100) : 100;
      const content = mem.memory || "";
      parts.push(`- ${content}`);
    });
  });

  if (parts.length === 0) {
    return "";
  }

  return parts.join("\n");
}

export const Mem0Plugin = async (ctx: {
  directory: string;
  client: {
    session: {
      messages: (params: {
        path: { id: string };
        query: { directory: string };
      }) => Promise<{
        data?: Array<{
          info: {
            role: string;
            sessionID?: string;
          };
          parts?: Array<{ type: string; text?: string }>;
        }>;
      }>;
      summarize: (params: {
        path: { id: string };
        body: { providerID: string; modelID: string };
        query: { directory: string };
      }) => Promise<unknown>;
    };
  };
}) => {
  const { directory } = ctx;
  const injectedSessions = new Set<string>();
  
  // Get config for this directory
  const config = getConfig(directory);
  const keywordPatterns = getKeywordPatterns();
  const apiClient = createMem0ApiClient(config.backendUrl);

  log("Plugin init", { directory, configured: isConfigured(directory) });

  if (!isConfigured(directory)) {
    log("Plugin disabled - MEM0_BACKEND_URL not set");
  }

  return {
    "chat.message": async (input: ChatMessageInput, output: ChatMessageOutput) => {
      if (!isConfigured(directory)) return;

      const start = Date.now();

      try {
        const textParts = output.parts.filter(
          (p): p is Part & { type: "text"; text: string } =>
            p.type === "text" && p.text
        );

        if (textParts.length === 0) {
          log("chat.message: no text parts found");
          return;
        }

        const userMessage = textParts.map((p) => p.text).join("\n");

        if (!userMessage.trim()) {
          log("chat.message: empty message, skipping");
          return;
        }

        log("chat.message: processing", {
          messagePreview: userMessage.slice(0, 100),
          partsCount: output.parts.length,
        });

        // Memory keyword detection
        if (detectMemoryKeyword(userMessage, keywordPatterns)) {
          log("chat.message: memory keyword detected");
          const nudgePart: Part = {
            id: `mem0-nudge-${Date.now()}`,
            sessionID: input.sessionID,
            messageID: output.message.id,
            type: "text",
            text: MEMORY_NUDGE_MESSAGE,
            synthetic: true,
          };
          output.parts.push(nudgePart);
        }

        // First message: inject memories
        const isFirstMessage = !injectedSessions.has(input.sessionID);

        if (isFirstMessage) {
          injectedSessions.add(input.sessionID);

          const memoriesResult = await fetchMemoriesByCategory(
            apiClient.getMemories.bind(apiClient),
            config.workspace,
            config.injectCategory
          );

          const memoryContext = formatMemoriesByCategory(memoriesResult);

          if (memoryContext) {
            const contextPart: Part = {
              id: `mem0-context-${Date.now()}`,
              sessionID: input.sessionID,
              messageID: output.message.id,
              type: "text",
              text: memoryContext,
              synthetic: true,
            };

            output.parts.unshift(contextPart);

            const duration = Date.now() - start;
            log("chat.message: context injected", {
              duration,
              contextLength: memoryContext.length,
            });
          }
        }
      } catch (error) {
        logError("chat.message: ERROR", { error: String(error) });
      }
    },

    tool: {
      mem0: {
        description:
          "Manage and query the mem0 persistent memory system. Use 'search' to find relevant memories, 'add' to store new knowledge, 'list' to see all memories, 'forget' to remove a memory.",
        args: {
          mode: {
            type: "string",
            enum: ["add", "search", "list", "forget", "help"],
            optional: true,
          },
          content: { type: "string", optional: true },
          query: { type: "string", optional: true },
          metadata: { type: "object", optional: true },
          memoryId: { type: "string", optional: true },
          limit: { type: "number", optional: true },
        },
        async execute(args: {
          mode?: string;
          content?: string;
          query?: string;
          metadata?: Record<string, unknown>;
          memoryId?: string;
          limit?: number;
        }) {
          if (!isConfigured(directory)) {
            return JSON.stringify({
              success: false,
              error: "MEM0_BACKEND_URL not set. Set it in your environment to use mem0.",
            });
          }

          const mode = args.mode || "help";

          try {
            switch (mode) {
              case "help": {
                return JSON.stringify({
                  success: true,
                  message: "mem0 Usage Guide",
                  commands: [
                    {
                      command: "add",
                      description: "Store a new memory",
                      args: ["content", "metadata?"],
                    },
                    {
                      command: "search",
                      description: "Search memories",
                      args: ["query", "metadata?"],
                    },
                    {
                      command: "list",
                      description: "List all memories",
                      args: ["metadata?", "limit?"],
                    },
                    {
                      command: "forget",
                      description: "Remove a memory",
                      args: ["memoryId"],
                    },
                  ],
                });
              }

              case "add": {
                if (!args.content) {
                  return JSON.stringify({
                    success: false,
                    error: "content parameter is required for add mode",
                  });
                }

                const sanitizedContent = stripPrivateContent(args.content);
                if (isFullyPrivate(args.content)) {
                  return JSON.stringify({
                    success: false,
                    error: "Cannot store fully private content",
                  });
                }

                const result = await apiClient.addMemory(
                  config.workspace,
                  [{ role: "user", content: sanitizedContent }],
                  args.metadata
                );

                if (!result.success) {
                  return JSON.stringify({
                    success: false,
                    error: result.error || "Failed to add memory",
                  });
                }

                return JSON.stringify({
                  success: true,
                  message: "Memory added successfully",
                  id: result.data?.id,
                });
              }

              case "search": {
                if (!args.query) {
                  return JSON.stringify({
                    success: false,
                    error: "query parameter is required for search mode",
                  });
                }

                const result = await apiClient.getMemories(
                  config.workspace,
                  args.query,
                  config.similarityThreshold,
                  args.metadata
                );

                if (!result.success) {
                  return JSON.stringify({
                    success: false,
                    error: result.error || "Failed to search memories",
                  });
                }

                const memories = result.data?.results || [];
                return JSON.stringify({
                  success: true,
                  query: args.query,
                  count: memories.length,
                  results: memories.slice(0, args.limit || 10).map((r) => ({
                    id: r.id,
                    content: r.memory,
                    score: r.score ? Math.round(r.score * 100) : undefined,
                    metadata: r.metadata,
                  })),
                });
              }

              case "list": {
                const result = await apiClient.getMemories(
                  config.workspace,
                  undefined,
                  0,
                  args.metadata
                );

                if (!result.success) {
                  return JSON.stringify({
                    success: false,
                    error: result.error || "Failed to list memories",
                  });
                }

                const memories = result.data?.results || [];
                return JSON.stringify({
                  success: true,
                  count: memories.length,
                  memories: memories.slice(0, args.limit || 20).map((m) => ({
                    id: m.id,
                    content: m.memory,
                    createdAt: m.created_at,
                    metadata: m.metadata,
                  })),
                });
              }

              case "forget": {
                if (!args.memoryId) {
                  return JSON.stringify({
                    success: false,
                    error: "memoryId parameter is required for forget mode",
                  });
                }

                const result = await apiClient.deleteMemory(args.memoryId);

                if (!result.success) {
                  return JSON.stringify({
                    success: false,
                    error: result.error || "Failed to delete memory",
                  });
                }

                return JSON.stringify({
                  success: true,
                  message: `Memory ${args.memoryId} removed`,
                });
              }

              default:
                return JSON.stringify({
                  success: false,
                  error: `Unknown mode: ${mode}`,
                });
            }
          } catch (error) {
            return JSON.stringify({
              success: false,
              error: error instanceof Error ? error.message : String(error),
            });
          }
        },
      },
    },

    event: async (input: {
      event: { type: string; properties?: Record<string, unknown> };
    }) => {
      const { event } = input;

      if (event.type === "session.idle" || event.type === "session.deleted") {
        const sessionID = event.properties?.sessionID as string | undefined;

        if (!sessionID) {
          log("event: no sessionID found");
          return;
        }

        log("event: session ended", { sessionID, type: event.type });

        try {
          const messagesResp = await ctx.client.session.messages({
            path: { id: sessionID },
            query: { directory },
          });

          const messages = messagesResp.data || [];

          // Extract message contents
          const messageContents = messages
            .map((m) => {
              const textParts = m.parts?.filter((p) => p.type === "text" && p.text) || [];
              return textParts.map((p) => p.text).join("\n");
            })
            .filter(Boolean)
            .join("\n\n");

          if (messageContents) {
            const result = await apiClient.addMemory(
              config.workspace,
              [{ role: "user", content: messageContents }],
              undefined // no category - let backend auto-extract
            );

            if (result.success) {
              log("event: session saved", { sessionID, memoryId: result.data?.id });
            } else {
              logError("event: failed to save session", { error: result.error });
            }
          }
        } catch (error) {
          logError("event: error saving session", { error: String(error) });
        }
      }
    },
  };
};
