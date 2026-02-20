import { log, logError } from "./logger.js";
import type {
  AddMemoryRequest,
  AddMemoryResponse,
  DeleteMemoryRequest,
  DeleteMemoryResponse,
  GetMemoriesResponse,
  GetMemoryRequest,
  MessageItem,
} from "../types/index.js";

const TIMEOUT_MS = 30000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    ),
  ]);
}

export class Mem0ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    const response = await withTimeout(
      fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      }),
      TIMEOUT_MS
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async addMemory(
    workSpace: string,
    messages: MessageItem[],
    metadata?: Record<string, unknown>
  ): Promise<AddMemoryResponse> {
    log("addMemory: start", { workSpace, messageCount: messages.length });

    try {
      const request: AddMemoryRequest = {
        workSpace,
        messages,
        metadata,
      };

      const result = await this.fetch<AddMemoryResponse>("/api/addMemories", request);

      if (result.success) {
        log("addMemory: success", { id: result.data?.id });
      } else {
        logError("addMemory: failed", { error: result.error });
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logError("addMemory: error", { error: errorMessage });
      return { success: false, error: errorMessage };
    }
  }

  async getMemories(
    workSpace: string,
    query?: string,
    threshold?: number,
    metadata?: Record<string, unknown>
  ): Promise<GetMemoriesResponse> {
    log("getMemories: start", { workSpace, query, metadata });

    try {
      const request: GetMemoryRequest = {
        workSpace,
        query,
        threshold: threshold ?? 0,
        metadata,
      };

      const result = await this.fetch<GetMemoriesResponse>("/api/getMemories", request);

      if (result.success) {
        log("getMemories: success", {
          count: result.data?.results?.length || 0,
        });
      } else {
        logError("getMemories: failed", { error: result.error });
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logError("getMemories: error", { error: errorMessage });
      return { success: false, error: errorMessage };
    }
  }

  async deleteMemory(memoryId: string): Promise<DeleteMemoryResponse> {
    log("deleteMemory: start", { memoryId });

    try {
      const request: DeleteMemoryRequest = { memoryId };
      const result = await this.fetch<DeleteMemoryResponse>("/api/deleteMemory", request);

      if (result.success) {
        log("deleteMemory: success", { memoryId });
      } else {
        logError("deleteMemory: failed", { error: result.error });
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logError("deleteMemory: error", { error: errorMessage });
      return { success: false, error: errorMessage };
    }
  }
}

export function createMem0ApiClient(baseUrl: string): Mem0ApiClient {
  return new Mem0ApiClient(baseUrl);
}
