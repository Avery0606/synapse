# opencode-plugin Guidelines

## 项目简介
**项目简要描述**: OpenCode 插件，提供一支高效的 AI 代码开发团队，包含领导者(Synapse)、代码定位专家(Oracle)、任务执行者(Ares)、代码检测员(Inspector)四种角色，通过自然语言指令驱动 AI 团队完成代码开发任务。

## 关键架构列表
opencode-plugin/
├── index.ts                # 插件主入口，负责注册 Agents、Commands
├── package.json            # 插件包配置，定义依赖和元信息
├── agents/                 # 团队智能体目录
│   ├── index.ts            # 团队创建入口，导出 createSynapseTeam
│   └── src/                # 各成员系统提示词
│       ├── synapse.ts      # 领导者 Synapse 的调度原则
│       ├── oracle.ts       # 代码定位专家 Oracle 的思维模式
│       ├── ares.ts         # 任务执行者 Ares 的工作流程
│       └── inspector.ts    # 代码检测员 Inspector 的质量标准
├── commands/               # 自定义指令目录
│   ├── index.ts            # 指令注册入口
│   └── src/                # 各指令实现
│       ├── plan.ts         # 计划模式（默认版）
│       ├── plan-simple.ts  # 计划模式（第一性原理版）
│       ├── plan-socratic.ts # 计划模式（苏格拉底版）
│       ├── deepInit.ts     # 深度初始化指令
│       └── selfImproving.ts # 自动优化指令
└── skills/                 # skill 存放目录，按需加载
    ├── agents-md-creator/  # AGENTS.md 创建与更新 skill
    └── act-like-socratic/  # 苏格拉底式提问 skill

## 开发约束
- [MUST] 类型检查：代码修改后必须执行 npx tsc --noEmit，确保无 TypeScript 问题
- [MUST] 依赖管理：新增依赖必须在 opencode-plugin 目录下执行 npm install，并在 package.json 中声明
- [MUST NOT] 禁止直接修改 node_modules 内的文件，所有依赖调整必须通过 package.json 管理
- [MUST] 关键目录变更时需同步更新 README.md：涉及核心架构调整时，确保文档与代码保持一致
- [MUST] 新增团队成员必须在 agents/index.ts 中注册，并在对应的 src/*.ts 中定义系统提示词
- [SHOULD] 团队成员调度优先通过 task 工具进行，保持职责边界清晰
- [MAY] 复杂任务可拆分为多个子任务并行执行，提升效率

## 项目开发指南
- 技术栈：使用 TypeScript 进行代码开发，充分利用类型系统保证代码质量
- 团队成员开发：在 opencode-plugin/agents 对 AI 开发团队进行修改、新增、删除团队成员，每个成员职责清晰
- 指令定义：在 opencode-plugin/commands 定义自定义指令，通过 /commandName 触发，遵循统一的注册规范
- 注册配置：在 opencode-plugin/index.ts 注册成员、指令以及工具，插件启动时自动加载
