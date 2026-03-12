# Synapse

OpenCode 插件，提供一支高效的 AI 开发团队。

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

## 快速开始

```bash
cd opencode-plugin

# 安装依赖
npm install

# 构建
npm run build
```

## 团队成员

| Agent | 说明 |
|-------|------|
| Synapse | 团队领导者，负责统筹调度、制定方案 |
| Oracle | 代码定位专家，负责代码查找与解释 |
| Ares | 任务执行者，负责具体代码操作 |

## 技术栈

- **语言**: TypeScript
- **SDK**: @opencode-ai/plugin

## 文档

详细说明见 [opencode-plugin/AGENTS.md](opencode-plugin/AGENTS.md)
