# 项目简介
**项目简要描述**: OpenCode 插件，提供一支高效的 AI 代码开发团队，包含领导者(Synapse)、代码定位专家(Oracle)、任务执行者(Ares)三种角色

# 关键架构列表
- opencode-plugin/：插件主目录，整个项目的入口
- opencode-plugin/agents/：团队智能体目录，包含 Synapse 团队成员定义
- opencode-plugin/commands/：自定义指令目录，提供插件命令
- opencode-plugin/tools/：自定义工具目录，提供功能工具

# 核心开发工作流程
- 团队成员开发：在 opencode-plugin/agents 对 AI 开发团队进行修改、新增、删除团队成员
- 指令定义：在 opencode-plugin/commands 定义自定义指令
- 工具开发：在 opencode-plugin/tools 定义 AI 开发团队的可用工具
- 注册配置：在 opencode-plugin/index.ts 注册成员、指令以及工具
- 代码格式化：代码修改后需要进行格式化，保持整个项目代码格式统一
- 依赖管理：新增依赖需要在 opencode-plugin 目录下执行 npm install 和 npm run build

# 开发约束
- 技术栈：使用 TypeScript 进行代码开发
- 代码质量：确保无 TypeScript 问题（无编译错误、无类型错误）
