# opencode-plugin Guidelines

## 目录简介
**目录简介**: 公共功能模块，OpenCode 插件的主目录，负责注册和管理 Agents、Commands

## 关键架构列表
- index.ts：插件入口文件，负责注册 Agents、Commands
- package.json：插件包配置，定义依赖和元信息
- agents/：团队智能体目录，包含 Synapse 团队成员定义
- commands/：自定义指令目录，提供插件命令
- skills/：skill 存放目录