# opencode-plugin/commands Guidelines

## 目录简介
**目录简介**: 业务模块，自定义指令目录，定义 OpenCode 插件的自定义命令

## 关键架构列表
commands/
├── index.ts            # 命令注册入口
└── src/                # 指令实现源码目录
    ├── selfImproving.ts # 自动优化 AGENTS.md 的命令
    ├── deepInit.ts     # 深度初始化 AGENTS.md 的命令
    ├── plan.ts         # 进入计划模式（默认版），为用户需求制定完整计划
    ├── plan-simple.ts  # 计划模式（第一性原理版），自动推断最小步骤
    └── plan-socratic.ts # 计划模式（苏格拉底版），用追问帮你完善计划

## 开发约束
- [MUST] 新增指令规范：新增指令必须在 src 目录下新增，并在 index.ts 中注册

## 目录开发指南
- 指令模板支持 `$1`、`$2` 等占位参数，用户输入指令时传递的参数会替换这些占位符

## 注意事项
- 修改 deepInit.ts 或 selfImproving.ts 时，注意检查 agents-md-creator skill 是否需要同步调整