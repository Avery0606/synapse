---
name: agents-md-creator
description: 当用户需要在指定目录创建 AGENTS.md，或更新某个已存在的 AGENTS.md 时，使用此 skill。比如用户说"帮我创建 AGENTS.md"、"在 xx 目录创建 AGENTS.md"、"更新一下 AGENTS.md"、"更新 xx 目录的 AGENTS.md"等明确意图时触发。
---

# agents-md-creator

用于在指定目录创建新的 AGENTS.md，或更新已存在的 AGENTS.md 文件。

## 模板章节

- 根目录 AGENTS.md：参见 [template/root.md](template/root.md)
- 子目录 AGENTS.md：参见 [template/subdir.md](template/subdir.md)

## 示例参考

- 正确示例：[examples/good.md](examples/good.md)
- 错误示例：[examples/bad.md](examples/bad.md)

---

## 创建流程

1. **确认目标目录**：向用户确认要在哪个目录创建 AGENTS.md
2. **扫描目录结构**：了解项目技术栈、关键目录
3. **逐章节询问**（必须按顺序）：
   - 项目简介/目录简介
   - 关键架构列表
   - 开发约束
   - 目录开发指南（仅子目录）
   - 项目开发指南/注意事项
4. **用户确认后**：按对应模板写入文件

---

## 更新流程

1. **读取目标 AGENTS.md**
2. **判断类型**：根目录用 root.md 模板，子目录用 subdir.md 模板
3. **呈现差异**：列出当前文件与模板的差异
4. **用户确认后**：按模板重建（章节/标题数量完全对齐，不能多不能少）

---

## 重要规则

- **必须先询问用户，确认后再生成**
- **更新时按模板重建，章节/标题数量完全对齐**
- **使用自然语言交互，不要一次性问太多问题**
- **如果用户跳过某个章节，直接跳过**
- **创建完成后展示文件内容给用户确认**
- **开发约束章节必须包含 [MUST] 和 [MUST NOT] 标签**