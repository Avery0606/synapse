# opencode-plugin/skills Guidelines

## 目录简介
**目录简介**: skill 存放目录

## 关键架构列表
skills/
├── agents-md-creator/  # 用于创建或更新 AGENTS.md 的 skill
├── act-like-socratic/  # 苏格拉底式提问 skill，通过追问帮助对方自己发现答案
└── test-case-generator/  # 生成结构化前端测试用例的 skill，必须输出符合模板的Markdown，支持可选XMind转换

## 开发约束
- [MUST] SKILL开发必须要包含测试用例 evals

## 目录开发指南
- 使用skill-creator skill完成一个skill的开发或更新
- Skill 优化使用 skill-creator 进行 evals 迭代

## 注意事项
- 修改 agents-md-creator skill 时，注意检查 deepInit.ts 或 selfImproving.ts 是否需要同步调整