# Memory Management System

基于 mem0 + Qdrant 的记忆管理系统，支持语义搜索、元数据过滤等功能。

## 项目业务背景

项目主要业务是解决目前市面AI无记忆的问题，通过mem0后台记忆系统以及get_memory等mcp工具，让AI能够在对话中动态调用获取记忆来将记忆添加进入对话上下文中。

## 关键文件快速导航

### 项目结构

```
synapse/
├── backend/           # Python + FastAPI 后端
├── frontend/          # Vue 3 + Vite + Element Plus 前端
├── mcp-server/        # Node.js MCP 服务器
└── opencode-plugin/  # OpenCode 插件
```

### backend/

| 文件 | 说明 |
|------|------|
| `app/main.py` | FastAPI 入口 |
| `app/memory_client.py` | mem0 单例客户端 |
| `app/routes/` | API 路由目录 |
| `mem0-config.yaml` | mem0 配置 |

**常用命令**：
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### frontend/

| 文件 | 说明 |
|------|------|
| `src/main.js` | 入口 |
| `src/App.vue` | 根组件 |
| `src/api/index.js` | API 调用 |
| `src/components/` | 组件目录 |

**常用命令**：
```bash
cd frontend
npm install
npm run dev
```

### mcp-server/

| 文件 | 说明 |
|------|------|
| `src/index.js` | MCP 工具实现 |

**常用命令**：
```bash
cd mcp-server
npm install
node src/index.js --workSpace <workspace-name>
```

### opencode-plugin/

OpenCode 插件，为 synapse 开发团队提供 agents、tools、commands。

| 目录 | 说明 |
|------|------|
| `agents/src/` | synapse 开发团队的 agents (synapse, oracle, mnemosyne, ares) |
| `tools/src/` | 开发团队的可用工具 (talk-to, get-latest-message) |
| `commands/src/` | 自定义指令 (deepInitAgentsMd, trainBusiness, synapseSummary) |

## 技术栈

- **前端**: Vue 3 + JavaScript + Vite + Element Plus
- **后端**: Python 3.8+ + FastAPI + mem0
- **向量数据库**: Qdrant
- **插件**: TypeScript + @opencode-ai/plugin SDK
