# opencode-plugin Guidelines

## 项目简介
**项目简要描述**: OpenCode 插件，提供一支高效的 AI 代码开发团队

## 关键架构列表
- opencode-plugin/：插件主目录，整个项目的入口
- opencode-plugin/agents/：团队智能体目录，包含 Synapse 团队成员定义
- opencode-plugin/commands/：自定义指令目录，提供插件命令

## 开发约束
- [MUST] 类型检查：代码修改后必须执行 npx tsc --noEmit，确保无 TypeScript 问题
- [MUST] 依赖管理：新增依赖必须在 opencode-plugin 目录下执行 npm install
- [MUST NOT] 禁止直接修改 node_modules 内的文件

## 项目开发指南
- 技术栈：使用 TypeScript 进行代码开发
- 团队成员开发：在 opencode-plugin/agents 对 AI 开发团队进行修改、新增、删除团队成员
- 指令定义：在 opencode-plugin/commands 定义自定义指令
- 注册配置：在 opencode-plugin/index.ts 注册成员、指令以及工具