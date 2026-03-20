# Synapse

OpenCode 插件，提供一支高效的 AI 开发团队。

## 项目结构

```
synapse/
└── opencode-plugin/         # OpenCode 插件
    ├── agents/              # 团队 Agents
    │   ├── synapse.ts       # 团队领导者
    │   ├── oracle.ts        # 代码定位专家
    │   ├── ares.ts          # 任务执行者
    │   └── inspector.ts      # 代码检测员
    └── commands/            # 自定义指令
        ├── deepInit.ts      # 深度初始化 AGENTS.md
        ├── selfImproving.ts # 自动优化 AGENTS.md
        ├── oracleIndex.ts    # 初始化/更新 Oracle.md 索引
        └── plan.ts          # 进入计划模式
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
| Inspector | 代码检测员，负责代码质量检查 |

## 技术栈

- **语言**: TypeScript
- **SDK**: @opencode-ai/plugin

## 文档

详细说明见 [opencode-plugin/AGENTS.md](opencode-plugin/AGENTS.md)
