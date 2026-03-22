# Synapse

OpenCode 插件，提供一支高效的 AI 开发团队。

## 项目结构

```
synapse/
├── AGENTS.md                # 项目主入口文档
└── opencode-plugin/         # OpenCode 插件
    ├── AGENTS.md             # 插件主目录文档
    ├── index.ts              # 插件入口文件
    ├── package.json          # 插件包配置
    ├── agents/               # 团队 Agents
    │   ├── AGENTS.md         # agents 目录文档
    │   ├── index.ts          # 团队创建入口
    │   └── src/
    │       ├── synapse.ts    # Synapse 团队领导者
    │       ├── oracle.ts     # Oracle 代码定位专家
    │       ├── ares.ts       # Ares 任务执行者
    │       └── inspector.ts  # Inspector 代码检测员
    ├── commands/             # 自定义指令
    │   ├── AGENTS.md         # commands 目录文档
    │   ├── index.ts          # 命令注册入口
    │   └── src/
    │       ├── deepInit.ts      # 深度初始化 AGENTS.md
    │       ├── selfImproving.ts # 自动优化 AGENTS.md
    │       └── plan.ts          # 进入计划模式
    └── skills/                # skill 存放目录
        ├── AGENTS.md           # skills 目录文档
        ├── agents-md-creator/  # 创建/更新 AGENTS.md 的 skill
        └── act-like-socratic/  # 苏格拉底式提问 skill
```

## 快速开始

```bash
cd opencode-plugin

# 安装依赖
npm install
```

在 opencode.json 中添加插件：
```json
"plugin": [
  "file:///<opencode-plugin/index.ts 绝对地址>"
]
```

将 skills 目录下的所有 skill 复制到 `.opencode/skills/`（不覆盖已有文件）：
```bash
cp -rn "opencode-plugin/skills/"* ".opencode/skills/"
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
