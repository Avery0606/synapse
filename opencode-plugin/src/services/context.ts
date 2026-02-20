import type { MemoryResult } from "../types/index.js";

export function formatContextForPrompt(
  category: string,
  memories: MemoryResult[]
): string {
  if (memories.length === 0) {
    return "";
  }

  const parts: string[] = [`[MEMORY - ${category}]`];

  memories.forEach((mem) => {
    const score = mem.score !== undefined ? Math.round(mem.score * 100) : 100;
    const content = mem.memory || "";
    parts.push(`- ${content}`);
  });

  return parts.join("\n");
}

export function formatMemoriesByCategory(
  memoriesByCategory: Map<string, MemoryResult[]>
): string {
  const parts: string[] = [];

  memoriesByCategory.forEach((memories, category) => {
    const formatted = formatContextForPrompt(category, memories);
    if (formatted) {
      parts.push(formatted);
    }
  });

  if (parts.length === 0) {
    return "";
  }

  return parts.join("\n\n");
}

export async function fetchMemoriesByCategory(
  getMemoriesFn: (
    workSpace: string,
    query?: string,
    threshold?: number,
    metadata?: Record<string, unknown>
  ) => Promise<{ success: boolean; data?: { results: MemoryResult[] }; error?: string }>,
  workspace: string,
  injectCategory: string
): Promise<Map<string, MemoryResult[]>> {
  const memoriesByCategory = new Map<string, MemoryResult[]>();

  const result = await getMemoriesFn(
    workspace,
    undefined,
    0,
    { category: injectCategory }
  );

  if (result.success && result.data?.results) {
    memoriesByCategory.set(injectCategory, result.data.results);
  }

  return memoriesByCategory;
}
