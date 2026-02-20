import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import { z } from 'zod';

// Parse command line arguments for workSpace
const args = process.argv.slice(2);
let WORKSPACE = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--workSpace' && args[i + 1]) {
    WORKSPACE = args[i + 1];
    break;
  }
}

if (!WORKSPACE) {
  console.error('Error: --workSpace parameter is required');
  console.error('Usage: node src/index.js --workSpace <workspace-name>');
  process.exit(1);
}

// Backend API base URL - can be overridden via environment variable
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';

// Tool input schemas
const GetMemorySchema = z.object({
  query: z.string().optional().describe('Semantic search query'),
  threshold: z.number().min(0).max(1).default(0.5).describe('Similarity threshold (0-1), default 0.5'),
  metadata: z.record(z.any()).optional().describe('Filter by metadata fields (e.g., {category: "work", type: "important"})'),
});

const AddMemorySchema = z.object({
  content: z.string().describe('Memory content to store'),
  metadata: z.record(z.any()).optional().describe('Optional metadata (e.g., {category: "..."})'),
});

// API helper functions
async function callBackend(endpoint, data) {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || error.message;
    throw new Error(`Backend API error: ${errorMessage}`);
  }
}

// Create MCP server
const server = new Server(
  {
    name: 'synapse',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_memory',
        description: 'Query memories from the memory storage. Use this to retrieve stored memories. You can search by query string, filter by metadata fields.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Semantic search query (optional)',
            },
            threshold: {
              type: 'number',
              description: 'Similarity threshold 0-1, default 0.5',
            },
            metadata: {
              type: 'object',
              description: 'Filter by metadata fields (e.g., {"category": "work", "type": "important"})',
              additionalProperties: true,
            },
          },
        },
      },
      {
        name: 'add_memory',
        description: 'Add a new memory to the memory storage. Use this to store important information that should be remembered.',
        inputSchema: {
          type: 'object',
          properties: {
            content: {
              type: 'string',
              description: 'Memory content to store',
            },
            metadata: {
              type: 'object',
              description: 'Optional metadata (e.g., {"category": "work"})',
              additionalProperties: true,
            },
          },
          required: ['content'],
        },
      },
      {
        name: 'get_metadata_fields',
        description: 'Query available metadata field names and values used in this workspace. Use this before adding or filtering memories to know which metadata fields are available (e.g., category values like "frontend", "backend", priority values like "high", "medium", "low").',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === 'get_memory') {
      const params = GetMemorySchema.parse(args);
      
      const requestBody = {
        workSpace: WORKSPACE,
      };
      
      if (params.query) requestBody.query = params.query;
      if (params.threshold !== undefined) requestBody.threshold = params.threshold;
      if (params.metadata) requestBody.metadata = params.metadata;

      const result = await callBackend('/api/getMemories', requestBody);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    if (name === 'add_memory') {
      const params = AddMemorySchema.parse(args);
      
      const requestBody = {
        workSpace: WORKSPACE,
        messages: [
          { role: 'user', content: params.content }
        ],
      };
      
      if (params.metadata) requestBody.metadata = params.metadata;

      const result = await callBackend('/api/addMemories', requestBody);
       
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    if (name === 'get_metadata_fields') {
      const requestBody = {
        workSpace: WORKSPACE,
      };

      const result = await callBackend('/api/getMetadataFields', requestBody);
       
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Synapse running on stdio');
}

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
