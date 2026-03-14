# opencode-plugin/commands/

**目录简介**: 业务模块，自定义指令目录，定义 OpenCode 插件的自定义命令

# 关键架构列表
- index.ts：命令注册入口
- src/：指令实现源码目录
- src/initOracle.ts：初始化 Oracle 索引的命令
- src/updateAgentsMd.ts：更新 AGENTS.md 的命令
- src/deepInitAgentsMd.ts：深度初始化 AGENTS.md 的命令

# 开发约束
- 新增指令规范：新增指令需要在 src 目录下新增，并在 index.ts 中注册
