# mem0

OpenCode plugin for persistent memory using your self-hosted mem0 backend.

Your agent remembers what you tell it - across sessions, across projects.

## Installation

### 1. Add Plugin to OpenCode

在 OpenCode 配置中添加插件路径：

```jsonc
// ~/.config/opencode/opencode.json
{
  "plugin": [
    "file:///D:/git-project/synapse/opencode-plugin"
  ]
}
```

### 2. Create Config File

支持两种配置方式：

#### 方式一：项目级别配置（推荐）

在项目根目录创建 `.opencode/synapse.json`：

```json
// {project}/.opencode/synapse.json
{
  "backendUrl": "http://localhost:8000",
  "workspace": "agentMemory",
  "injectCategory": "basicInfos",
  "similarityThreshold": 0.6
}
```

#### 方式二：全局配置

在用户配置目录创建 `~/.config/opencode/synapse.json`：

```json
// ~/.config/opencode/synapse.json
{
  "backendUrl": "http://localhost:8000",
  "workspace": "agentMemory",
  "injectCategory": "basicInfos",
  "similarityThreshold": 0.6
}
```

## Configuration

### 配置优先级

**项目配置 > 全局配置 > 环境变量 > 默认值**

### 配置项

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `backendUrl` | `http://localhost:8000` | mem0 后端地址 |
| `workspace` | `agentMemory` | 工作区名称 |
| `injectCategory` | `basicInfos` | 首次注入的记忆类别 |
| `similarityThreshold` | `0.6` | 搜索相似度阈值 |

**优先级**：环境变量 > 配置文件 > 默认值

### 环境变量覆盖

```bash
# 可用环境变量覆盖配置文件
export MEM0_BACKEND_URL="http://localhost:8000"
export MEM0_WORKSPACE="agentMemory"
export MEM0_INJECT_CATEGORY="basicInfos"
export MEM0_SIMILARITY_THRESHOLD=0.6
```

## Features

### Context Injection

首次消息时，Agent 会自动接收（对用户不可见）：
- 配置类别的记忆（如 `basicInfos`）

注入示例：
```
[MEMORY - basicInfos]
- 2026年除夕创建的项目
- 项目名称: agentMemory
- 项目前端用的是 Vue
- 项目后台使用 Python + FastAPI
- 项目提供添加记忆、删除记忆、搜索记忆的接口
- 需要使用Node.js来启动MCP服务
```

Agent 自动使用这些上下文 - 无需手动提示。

### Keyword Detection

说出 "remember", "save this", "don't forget" 等关键词，Agent 会自动保存到记忆。

```
你说: "记住这个项目使用 bun"
Agent: [自动保存到项目记忆]
```

### Session Auto-Save

会话结束时（`session.idle` 或 `session.deleted`），自动将会话内容保存到后端，后端会自动提取关键信息。

### Privacy

```
API key is <private>sk-abc123</private>
```

`<private>` 标签内的内容不会被存储。

## Tool Usage

`mem0` tool 供 Agent 使用：

| Mode | Args | Description |
|------|------|-------------|
| `add` | `content`, `metadata?` | 添加记忆 |
| `search` | `query`, `metadata?` | 搜索记忆 |
| `list` | `metadata?`, `limit?` | 列出记忆 |
| `forget` | `memoryId` | 删除记忆 |

### 添加记忆

```json
{
  "mode": "add",
  "content": "这个项目使用 Vue 3 + Element Plus",
  "metadata": { "category": "frontend" }
}
```

### 搜索记忆

```json
{
  "mode": "search",
  "query": "前端技术栈"
}
```

### 列出记忆

```json
{
  "mode": "list",
  "metadata": { "category": "frontend" },
  "limit": 10
}
```

### 删除记忆

```json
{
  "mode": "forget",
  "memoryId": "xxx-xxx-xxx"
}
```

## Configuration

### 使用环境变量

```bash
# 必需：后端地址
export MEM0_BACKEND_URL="http://localhost:8000"

# 可选：工作区
export MEM0_WORKSPACE="agentMemory"

# 可选：首次注入的记忆类别
export MEM0_INJECT_CATEGORY="basicInfos"

# 可选：搜索相似度阈值
export MEM0_SIMILARITY_THRESHOLD=0.6
```

## Development

```bash
cd opencode-plugin

# 安装依赖（如果需要）
npm install

# TypeScript 编译
npm run build
```

## 文件结构

```
opencode-plugin/
├── src/
│   ├── index.ts          # 主插件入口
│   ├── config.ts         # 配置管理
│   ├── types/
│   │   └── index.ts     # TypeScript 类型
│   └── services/
│       ├── api.ts       # HTTP 客户端
│       ├── context.ts   # 上下文格式化
│       ├── privacy.ts   # 隐私过滤
│       └── logger.ts    # 日志
├── package.json
└── tsconfig.json
```

## License

MIT
