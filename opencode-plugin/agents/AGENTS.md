# opencode-plugin/agents Guidelines

## 目录简介
**目录简介**: 业务模块，AI 开发团队智能体目录，定义团队成员（Synapse、Oracle、Ares、Inspector）

## 开发约束
- [MUST NOT] 禁止在子智能体编写智能体的工作流程，而是要编写智能体的思维模式

## 目录开发指南

- 添加权限时，后面的规则会覆盖前面的规则，如 git * deny 在前，git diff allow 在后，则 diff 为 allow

## 注意事项
- 成员变更同步要求：新增或删除子员工，需要同步修改以下内容：
  - 团队领导 Synapse 的提示词
  - 其余所有员工的团队介绍部分
- 重大哲学性重写同步：涉及团队成员 prompt 的重大哲学性重写时，建议检查其他成员的描述是否需要同步对齐，确保团队整体哲学自洽
