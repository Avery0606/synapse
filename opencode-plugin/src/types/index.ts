export interface MessageItem {
  role: string;
  content: string;
}

export interface AddMemoryRequest {
  workSpace: string;
  messages: MessageItem[];
  metadata?: Record<string, unknown>;
}

export interface GetMemoryRequest {
  workSpace: string;
  query?: string;
  threshold?: number;
  metadata?: Record<string, unknown>;
}

export interface DeleteMemoryRequest {
  memoryId: string;
}

export interface MemoryResult {
  id: string;
  memory: string;
  score?: number;
  metadata?: Record<string, unknown>;
  created_at?: string;
}

export interface GetMemoriesResponse {
  success: boolean;
  data?: {
    results: MemoryResult[];
  };
  error?: string;
}

export interface AddMemoryResponse {
  success: boolean;
  data?: {
    id: string;
  };
  error?: string;
}

export interface DeleteMemoryResponse {
  success: boolean;
  message?: string;
  error?: string;
}
