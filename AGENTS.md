# synapse Guidelines

## 项目简介
**项目简要描述**: OpenCode 插件，提供一支高效的 AI 代码开发团队，包含领导者(Synapse)、代码定位专家(Oracle)、任务执行者(Ares)、代码检测员(Inspector)四种角色

## 关键架构列表
opencode-plugin/
├── index.ts                # 插件主入口文件
├── package.json            # 项目依赖配置
├── agents/                 # 团队智能体目录，包含 Synapse 团队成员定义
│   ├── index.ts            # 团队创建入口，导出 createSynapseTeam 函数
│   └── src/                # 团队成员系统提示词目录
│       ├── synapse.ts      # Synapse 的系统提示词，定义领导者的调度原则与团队管理
│       ├── oracle.ts       # Oracle 的系统提示词，定义代码定位专家的思维模式
│       ├── ares.ts         # Ares 的系统提示词，定义任务执行者的工作流程
│       └── inspector.ts    # Inspector 的系统提示词，定义代码检测员的质量标准
├── commands/               # 自定义指令目录，提供插件命令
│   ├── index.ts            # 命令注册入口，导出 SynapseCommand 对象
│   └── src/                # 指令实现目录
│       ├── deepInit.ts     # deep-init 指令的实现，用于深度初始化 AGENTS.md
│       ├── selfImproving.ts # self-improving 指令的实现，用于自动优化 AGENTS.md
│       ├── plan.ts         # plan 指令的实现，用于进入计划模式制定开发计划（默认版）
│       ├── plan-simple.ts  # 计划模式（第一性原理版），自动推断最小步骤
│       ├── plan-socratic.ts # 计划模式（苏格拉底版），用追问帮你完善计划
│       └── apply-skill.ts  # apply-skill 指令的实现，用于加载并执行指定 skill
 └── skills/                 # skill 存放目录，按需加载
     ├── agents-md-creator/  # AGENTS.md 创建与更新的 skill，包含模板与示例
     ├── act-like-socratic/  # 苏格拉底式提问的 skill，用于引导式思考
     └── test-case-generator/ # 生成结构化测试用例的 skill（严格模板 + 可选XMind）

## 开发约束
- [MUST] 类型检查：代码修改后必须执行 npx tsc --noEmit，确保无 TypeScript 问题
  - 注：部分 SDK 类型定义不完整的错误（如 permission 字段）可以忽略，不影响运行
- [MUST] 依赖管理：新增依赖必须在 opencode-plugin 目录下执行 npm install
- [MUST] 关键目录变更：涉及关键目录变更时，需检查 README.md 是否需要同步更新

## 项目开发指南
- 技术栈：使用 TypeScript 进行代码开发
- 团队成员开发：在 opencode-plugin/agents 对 AI 开发团队进行修改、新增、删除团队成员
- 指令定义：在 opencode-plugin/commands 定义自定义指令
- 注册配置：在 opencode-plugin/index.ts 注册成员、指令以及工具
- 按需阅读子目录的AGENTS.md获取更详细的对应的子目录开发指南