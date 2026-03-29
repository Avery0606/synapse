# opencode-plugin/agents Guidelines

## 目录简介
**目录简介**: 团队智能体目录，包含 Synapse 开发团队的成员定义（Oracle/Oracle/Ares/Inspector），每个成员有独立的系统提示词、工具权限和工作流程，通过 index.ts 统一导出创建。

## 关键架构列表
agents/
├── index.ts                # 团队创建入口，导出 createSynapseTeam 函数
└── src/                    # 各成员系统提示词
    ├── synapse.ts          # 领导者 Synapse：调度原则、团队管理、沟通风格
    ├── oracle.ts           # 代码定位专家 Oracle：代码定位、逻辑解释
    ├── ares.ts             # 任务执行者 Ares：批量修改、脚本执行
    └── inspector.ts        # 代码检测员 Inspector：代码 review、质量检查

## 开发约束
- [MUST] 新增成员必须同时创建 src/*.ts 系统提示词文件，并在 index.ts 中注册
- [MUST] 系统提示词必须包含清晰的职责定义、可调用工具说明、输出格式规范
- [MUST NOT] 禁止在系统提示词中硬编码业务逻辑，成员应保持职责单一
- [MUST] 成员调度必须通过 Synapse 统一分配，不允许跨级调用
- [SHOULD] 新增专业角色时，优先复用现有成员的调度模式，避免过度定制
- [MAY] 成员可按需调用其他成员工具完成协作，如 Ares 可请求 Oracle 定位代码

## 目录开发指南
- 成员职责设计遵循"单一职责"原则：Oracle 负责定位、Ares 负责执行、Inspector 负责质检、Synapse 负责决策
- 新增专业角色时，先在 src/ 下创建对应的系统提示词文件
- 系统提示词采用"角色 + 能力 + 约束"的三段式结构，便于 AI 理解和遵循

## 注意事项
- Synapse 作为领导者，调度任务时"只说做什么，不说怎么做"，给予成员发挥空间
- Oracle 定位问题时采用"先广度后深度"的策略，先定位文件再定位具体逻辑
- Ares 执行任务时如遇复杂场景，应主动拆分步骤并汇报进度
