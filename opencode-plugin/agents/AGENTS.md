# opencode-plugin/agents/

**目录简介**: 业务模块，AI 开发团队智能体目录，定义团队成员（Synapse、Oracle、Ares、Inspector）

# 关键架构列表
- index.ts：团队创建入口，导出 createSynapseTeam 函数
- src/：智能体实现源码目录
- src/synapse.ts：Synapse 领导者智能体，负责统筹调度和决策
- src/oracle.ts：Oracle 代码定位专家，负责代码搜索与解释
- src/ares.ts：Ares 任务执行者，负责具体代码操作
- src/inspector.ts：Inspector 代码检测员，负责代码质量检查

# 开发约束
- 工作流程编写规范：禁止在子智能体编写智能体的工作流程，而是要编写智能体的思维模式
- 成员变更同步要求：新增或删除子员工，需要同步修改以下内容：
  - 团队领导 Synapse 的提示词
  - tools 目录下的 talk-to 工具
  - tools/store 的枚举值
  - 其余所有员工的团队介绍部分

# 注意事项
- 暂无
