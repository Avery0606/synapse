# Synapse

OpenCode 插件，提供一支高效的 AI 开发团队。

## 项目业务背景

Synapse 是一支 AI 开发团队，通过分工协作（协调、探索、执行）完成开发任务。

## 项目结构

```
synapse/
└── opencode-plugin/         # OpenCode 插件
    ├── agents/              # 团队 Agents
    │   ├── synapse.ts       # 团队领导者
    │   ├── oracle.ts        # 代码定位专家
    │   └── ares.ts          # 任务执行者
    ├── commands/            # 自定义指令
    │   ├── deepInitAgentsMd.ts
    │   └── updateAgentsMd.ts
    └── tools/               # 自定义工具
        ├── talk-to.ts
        └── get-latest-message.ts
```

### opencode-plugin/

| 目录 | 说明 |
|------|------|
| `agents/` | 团队 Agents (synapse, oracle, ares) |
| `commands/` | 自定义指令 |
| `tools/` | 自定义工具 |

## 技术栈

- **语言**: TypeScript
- **SDK**: @opencode-ai/plugin

## 常用命令

```bash
cd opencode-plugin

# 安装依赖
npm install

# 构建
npm run build
```

## 文档

详细说明见 [opencode-plugin/AGENTS.md](opencode-plugin/AGENTS.md)
