import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

interface Mem0Config {
  backendUrl: string;
  workspace: string;
  injectCategory: string;
  similarityThreshold: number;
}

interface Mem0ConfigFile {
  backendUrl?: string;
  workspace?: string;
  injectCategory?: string;
  similarityThreshold?: number;
}

const DEFAULT_KEYWORD_PATTERNS = [
  "remember",
  "memorize",
  "save\\s+this",
  "note\\s+this",
  "keep\\s+in\\s+mind",
  "don'?t\\s+forget",
  "learn\\s+this",
  "store\\s+this",
  "record\\s+this",
  "make\\s+a\\s+note",
  "take\\s+note",
  "jot\\s+down",
  "commit\\s+to\\s+memory",
  "remember\\s+that",
  "never\\s+forget",
  "always\\s+remember",
];

const DEFAULT_CONFIG: Mem0Config = {
  backendUrl: "http://localhost:8000",
  workspace: "agentMemory",
  injectCategory: "basicInfos",
  similarityThreshold: 0.6,
};

function isValidRegex(pattern: string): boolean {
  try {
    new RegExp(pattern);
    return true;
  } catch {
    return false;
  }
}

function loadConfigFromPath(configPath: string): Mem0ConfigFile {
  if (existsSync(configPath)) {
    try {
      const content = readFileSync(configPath, "utf-8");
      return JSON.parse(content) as Mem0ConfigFile;
    } catch {
      // Invalid config, use defaults
    }
  }
  return {};
}

function loadConfig(directory?: string): Mem0Config {
  // Priority: env var > project config > global config > defaults
  
  // 1. Project level config: {directory}/.opencode/synapse.json
  let projectConfig: Mem0ConfigFile = {};
  if (directory) {
    const projectConfigPath = join(directory, ".opencode", "synapse.json");
    projectConfig = loadConfigFromPath(projectConfigPath);
  }
  
  // 2. Global config: ~/.config/opencode/synapse.json
  const globalConfigPath = join(homedir(), ".config", "opencode", "synapse.json");
  const globalConfig = loadConfigFromPath(globalConfigPath);
  
  // 3. Merge configs (project overrides global)
  const fileConfig: Mem0ConfigFile = {
    ...globalConfig,
    ...projectConfig,
  };

  return {
    backendUrl: process.env.MEM0_BACKEND_URL || fileConfig.backendUrl || DEFAULT_CONFIG.backendUrl,
    workspace: process.env.MEM0_WORKSPACE || fileConfig.workspace || DEFAULT_CONFIG.workspace,
    injectCategory: process.env.MEM0_INJECT_CATEGORY || fileConfig.injectCategory || DEFAULT_CONFIG.injectCategory,
    similarityThreshold: parseFloat(process.env.MEM0_SIMILARITY_THRESHOLD || "") || fileConfig.similarityThreshold || DEFAULT_CONFIG.similarityThreshold,
  };
}

// Lazy-loaded config per directory
let cachedConfig: Mem0Config | null = null;
let cachedDirectory: string | null = null;

export function getConfig(directory?: string): Mem0Config {
  // Cache config per directory
  if (cachedDirectory === directory && cachedConfig) {
    return cachedConfig;
  }
  
  cachedConfig = loadConfig(directory);
  cachedDirectory = directory || null;
  return cachedConfig;
}

export function getKeywordPatterns(): string[] {
  return [
    ...DEFAULT_KEYWORD_PATTERNS,
    ...(process.env.MEM0_KEYWORD_PATTERNS?.split(",").filter(isValidRegex) || []),
  ];
}

export function isConfigured(directory?: string): boolean {
  return !!getConfig(directory).backendUrl;
}
