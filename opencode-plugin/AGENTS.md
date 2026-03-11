# OpenCode Plugin

OpenCode 插件，为 synapse 开发团队提供具有记忆功能的 agents、tools 和 commands。

## 项目业务背景

opencode-plugin 是提供给 OpenCode 使用的插件，提供了一支具有记忆的开发团队 agents，以及一些自定义指令。该插件使 AI 能够记住项目背景、业务知识、代码位置等信息，提供更精准的开发辅助。

## 关键文件快速导航

| 目录 | 说明 |
|------|------|
| `agents/src/` | 开发团队 agents (synapse, oracle, mnemosyne, ares) |
| `tools/src/` | 可用工具 (talk-to, get-latest-message) |
| `commands/src/` | 自定义指令 (deepInitAgentsMd, trainBusiness, synapseSummary) |

### Agents

| Agent | 说明 |
|-------|------|
| `synapse.ts` | 主 Agent，协调团队工作 |
| `oracle.ts` | 代码定位专家，负责代码定位与解释 |
| `mnemosyne.ts` | 业务大师，负责项目背景与业务知识查询 |
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
| `trainBusiness` | 训练业务知识 |
| `synapseSummary` | 生成项目总结 |

## 常用命令

```bash
cd opencode-plugin

# 安装依赖
npm install

# 构建
npm run build
```
