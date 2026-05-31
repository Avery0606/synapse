# skills Guidelines

## 目录简介
**目录简介**: skill 存放目录

## 开发约束
- [MUST] SKILL开发必须要包含测试用例 evals
- [MUST] 创建或修改 skill 结构时，需检查是否存在深层 `SKILL.md`，并确保仅顶层 skill 目录使用标准命名

## 目录开发指南
- 使用skill-creator skill完成一个skill的创建
- 使用 skill-refiner 对一个skill进行问题审查与迭代改进

## 注意事项
opencode 会自动递归加载项目中**所有** `SKILL.md` 文件（无论嵌套多深），并将其注册为独立 skill。这是因为 opencode 的 skill 发现机制是基于文件命名而非目录层级。

**正常情况**：每个 skill 根目录只应有一个 `SKILL.md`。

**异常情况**：如果 skill 内部需要存放示例或参考文件，**必须**使用 `EXAMPLE.md`、`SKILL.example.md`、`REFERENCE.md` 等非标准命名，避免被误加载。