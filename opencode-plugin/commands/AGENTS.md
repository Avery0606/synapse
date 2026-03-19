# opencode-plugin/commands/

**目录简介**: 业务模块，自定义指令目录，定义 OpenCode 插件的自定义命令

# 关键架构列表
- index.ts：命令注册入口
- src/：指令实现源码目录
- src/oracleIndex.ts：初始化/更新 Oracle.md 索引的命令
- src/selfImproving.ts：自动优化 AGENTS.md 的命令
- src/deepInit.ts：深度初始化 AGENTS.md 的命令
- src/plan.ts：进入计划模式，为用户需求制定完整计划

# 开发约束
- [MUST] 新增指令规范：新增指令必须在 src 目录下新增，并在 index.ts 中注册

# 注意事项
- deep-init 与 self-improving 同步要求：更新 deepInit.ts 指令时，需要注意同步更新 selfImproving.ts 相关部分（两者存在业务关联）
