# synapse Guidelines

## 项目简介
**项目简要描述**: OpenCode 插件，提供一支高效的 AI 代码开发团队，包含领导者(Synapse)、代码定位专家(Oracle)、任务执行者(Ares)、代码检测员(Inspector)四种角色

## 关键架构列表
opencode-plugin/
├── index.ts                # 插件主入口文件
├── package.json            # 项目依赖配置
├── agents/                 # 团队智能体目录，包含 Synapse 团队成员定义
│   ├── index.ts            # 团队创建入口，导出 createSynapseTeam 函数
│   └── src/                # 智能体实现源码目录
│       ├── synapse.ts      # Synapse 领导者智能体，负责统筹调度和决策
│       ├── oracle.ts       # Oracle 代码定位专家，负责代码搜索与解释
│       ├── ares.ts         # Ares 任务执行者，负责具体代码操作
│       └── inspector.ts    # Inspector 代码检测员，负责代码质量检查
├── commands/               # 自定义指令目录，提供插件命令
│   ├── index.ts            # 命令注册入口
│   └── src/                # 指令实现源码目录
│       ├── selfImproving.ts # 自我改进命令，自动优化项目 AGENTS.md
│       ├── deepInit.ts     # 深度初始化 AGENTS.md 的命令
│       ├── plan.ts         # 进入计划模式（默认版）
│       ├── plan-atomic.ts  # 计划模式（原子版）
│       ├── plan-socratic.ts # 计划模式（苏格拉底版）
│       └── plan-clarify.ts  # 计划模式（澄清版）
 skills/                     # skill 存放目录
├── AGENTS.md               # skills 开发指南
├── what-is-agentsmd/       # 教学型 skill，解释 AGENTS.md 的定义、作用、技术原理等
├── skill-refiner/          # 迭代优化其他 skill 提示词与结构的 meta-skill
└── soul-refiner/           # 迭代优化 SOUL.md（AI 代理人格文件）的 meta-skill
test-cases/                 # 测试用例目录
├── for-ai/                 # AI 可纯执行的测试用例（脚本/目录检查）
└── for-human/              # 需要人工手动验证的测试用例

## Where to Look（日常任务快速入口）

- 优化 Synapse / 团队灵魂（人格、提示词、风格）  
  → `opencode-plugin/agents/src/synapse.ts` + soul-refiner

- 优化 / 新增 skills  
  → `skills/AGENTS.md` + skill-refiner

- 新增自定义指令  
  → `opencode-plugin/commands/AGENTS.md`

- 配置 Synapse + skills 到 opencode  
  → `README.md`

- 更新依赖  
  → `opencode-plugin/package.json` + root `package.json`

- 执行 / 验证 test-cases  
  → `test-cases/for-ai/`

## 开发约束
- [MUST] 类型检查：代码修改后必须执行 npx tsc --noEmit，确保无 TypeScript 问题
  - 注：部分 SDK 类型定义不完整的错误（如 permission 字段）可以忽略，不影响运行
- [MUST] 依赖管理：新增依赖必须在 opencode-plugin 目录下执行 npm install
- [SHOULD] 关键目录变更：涉及关键目录变更时，需检查 README.md、scripts/ 下脚本的硬编码路径是否需要同步更新

## 项目开发指南
- 技术栈：使用 TypeScript 进行代码开发
- 团队成员开发：在 opencode-plugin/agents 对 AI 开发团队进行修改、新增、删除团队成员
- 指令定义：在 opencode-plugin/commands 定义自定义指令
- 注册配置：在 opencode-plugin/index.ts 注册成员、指令以及工具
- 测试用例：开发完成后，分配subagent执行 test-cases/for-ai 目录下相关的测试用例验证功能正常
- 按需阅读子目录的AGENTS.md获取更详细的对应的子目录开发指南