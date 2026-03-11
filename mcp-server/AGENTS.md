# MCP Server

AI Agent 使用的 MCP (Model Context Protocol) 工具服务，提供记忆管理的标准接口。

## 项目业务背景

mcp-server 是提供给 AI Agent 使用的 MCP 工具服务，提供了添加记忆、查询记忆、更新记忆、删除记忆等可用工具，对接后台记忆系统。AI Agent 可通过 MCP 协议调用这些工具实现记忆的动态管理。

## 关键文件快速导航

| 文件 | 说明 |
|------|------|
| `src/index.js` | MCP 服务器实现，定义所有工具 |

## MCP 工具

| 工具 | 功能 | 参数 |
|------|------|------|
| `get_memory` | 查询记忆 | `query?`, `threshold?`, `metadata?` |
| `add_memory` | 添加记忆 | `content`, `metadata?` |
| `update_memory` | 更新记忆 | `memoryId`, `content` |
| `delete_memory` | 删除记忆 | `memoryId` |

## 常用命令

```bash
cd mcp-server

# 安装依赖
npm install

# 启动服务 (必须指定 workSpace 参数)
node src/index.js --workSpace <workspace-name>
```

## 环境配置

- `API_BASE_URL`: 后端 API 地址 (默认 http://localhost:8000)

## Claude Desktop / Cursor 配置

```json
{
  "mcpServers": {
    "memory": {
      "command": "node",
      "args": ["path/to/mcp-server/src/index.js", "--workSpace", "your-workspace"]
    }
  }
}
```
