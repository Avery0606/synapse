# OpenCode Plugin

OpenCode 插件，为 synapse 开发团队提供 agents、tools 和 commands。

## 项目业务背景

opencode-plugin 是提供给 OpenCode 使用的插件，提供了一支高效的开发团队 agents，以及一些自定义指令。团队成员各司其职，协同完成开发任务。

## 关键文件快速导航

| 目录 | 说明 |
|------|------|
| `agents/src/` | 开发团队 agents (synapse, oracle, ares) |
| `tools/src/` | 可用工具 (talk-to, get-latest-message) |
| `commands/src/` | 自定义指令 (deepInitAgentsMd, updateAgentsMd) |

### Agents

| Agent | 说明 |
|-------|------|
| `synapse.ts` | 主 Agent，协调团队工作 |
| `oracle.ts` | 代码定位专家，负责代码定位与解释 |
| `ares.ts` | 任务执行者，按指令执行任务 |

### Tools

| Tool | 说明 |
|------|------|
| `talk-to` | 发送消息给指定员工/Agent |
| `get-latest-message` | 获取指定员工最新消息 |

### Commands

| Command | 说明 |
|---------|------|
| `deepInitAgentsMd` | 深度初始化 Agents 文档 |
| `updateAgentsMd` | 更新项目中需要变更的 AGENTS.md 文件 |

## 常用命令

```bash
cd opencode-plugin

# 安装依赖
npm install

# 构建
npm run build
```
