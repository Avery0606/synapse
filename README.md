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
    │       ├── plan.ts          # 进入计划模式（默认版）
    │       ├── plan-simple.ts   # 计划模式（第一性原理版）
    │       └── plan-deep.ts     # 计划模式（苏格拉底版）
    └── skills/                # skill 存放目录
        ├── AGENTS.md           # skills 目录文档
        ├── agents-md-creator/  # 创建/更新 AGENTS.md 的 skill
        └── act-like-socratic/  # 苏格拉底式提问 skill
```

## 前置准备

```bash
# 一键安装根目录及 opencode-plugin 依赖
npm run bootstrap
```

在 opencode.json 中添加插件：
```json
"plugin": [
  "file:///<opencode-plugin/index.ts 绝对地址>"
]
```

将 skills 目录下的所有 skill 复制到 `.opencode/skills/`（不覆盖已有文件）：
```bash
cp -rn "opencode-plugin/skills/*" ".opencode/skills/"
```

安装完成后，建议额外安装以下 skill 以获取更好的使用体验：
- skill-creator
- clean-code

## 插件使用流程

按照以下顺序使用插件：

**Step 1 - 初始化**：运行 `/deep-init` 深度初始化项目 AGENTS.md 文件，建立项目文档基础

**Step 2 - 制定计划**：遇到复杂需求时，输入以下命令之一进入计划模式：
- `/plan <口令>` — 默认版，综合评估需求后制定完整计划
- `/plan-simple <口令>` — 第一性原理版，自动推断最小步骤，不多做不多说
- `/plan-deep <口令>` — 苏格拉底版，用追问帮你把计划做得更完善

**Step 3 - 执行开发**：在计划模式下确认方案后，Synapse 调度团队成员（Oracle 查代码、Ares 执行、Inspector 检测）协作完成任务

**Step 4 - 优化沉淀**：需求完成后，运行 `/self-improving` 提取会话内容，自动优化更新 AGENTS.md

**Step 5 - 按需增强**：对话过程中，随时使用 `/apply-skill <skill-name>` 加载指定 skill（如 skill-creator、clean-code）增强特定能力

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
