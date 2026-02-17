# Memory MCP Server

MCP server for memory management - provides tools to query and add memories to your backend memory system.

## Features

- **get_memory**: Query memories from storage with optional semantic search
- **add_memory**: Add new memories to storage

## Requirements

- Node.js 18+
- Backend server running (default: http://localhost:8000)

## Installation

```bash
cd mcp-server
npm install
```

## Configuration

Set environment variable to override backend URL:

```bash
export API_BASE_URL=http://localhost:8000
```

## Usage

### Run directly

```bash
npm start
```

### Usage with Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "memory": {
      "command": "node",
      "args": ["path/to/mcp-server/src/index.js"]
    }
  }
}
```

### Usage with Cursor

Add to Cursor settings > MCP Servers:

```json
{
  "mcpServers": {
    "memory": {
      "command": "node",
      "args": ["path/to/mcp-server/src/index.js"]
    }
  }
}
```

## Tools

### get_memory

Query memories from storage.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| workSpace | string | Yes | Workspace name |
| query | string | No | Semantic search query |
| threshold | number | No | Similarity threshold (0-1) |
| category | string | No | Filter by category |

### add_memory

Add a new memory to storage.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| workSpace | string | Yes | Workspace name |
| content | string | Yes | Memory content |
| metadata | object | No | Optional metadata |

## Example

```javascript
// Get all memories in a workspace
await get_memory({ workSpace: "my-workspace" });

// Search memories with query
await get_memory({ 
  workSpace: "my-workspace", 
  query: "meeting notes",
  threshold: 0.7
});

// Add a new memory
await add_memory({
  workSpace: "my-workspace",
  content: "Remember to review the quarterly report",
  metadata: { category: "work" }
});
```
