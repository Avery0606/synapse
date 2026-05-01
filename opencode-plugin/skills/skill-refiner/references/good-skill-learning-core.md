# Good Skill 写作核心指南（精简版）

> 提炼自优秀 skill 实例，仅保留最高频、最关键的规则。

---

## 1. 触发机制（最重要）

`description` 是技能是否被调用的唯一入口，必须**具体 + pushy**。

### 好的 description 特征
- 明确列出所有触发场景（文件类型、操作、关键词）
- 使用 "Use this skill whenever..." 或 "Make sure to use this skill when..."
- 包含用户可能说的各种说法（即使没明确提 skill 名字）
- 必要时加上排除项（Do NOT use for...）

**反例**：
```yaml
description: "How to build a dashboard."
```

**正例**：
```yaml
description: "Use this skill whenever the user wants to optimize, refine, or review any skill's SKILL.md. This includes phrases like '优化这个 skill', 'refine skill-xxx', '改进 skill 提示词', '这个 skill 写得太烂了', or any request to improve a skill's prompt or structure. Always use this skill for skill improvement tasks."
```

---

## 2. Progressive Disclosure（三层加载）

| 层级 | 内容 | 加载时机 | 目标大小 |
|------|------|----------|----------|
| 元数据 | name + description | 始终 | ~100 words |
| SKILL.md body | 核心指令 + 工作流 | 触发时 | **< 500 行** |
| references/ + examples/ | 详细文档、完整示例 | 按需 | 无限制 |

**原则**：主文件只放“必须每次都看”的内容，其余全部下沉到 references/ 或 examples/。

---

## 3. 写作风格

- **优先使用祈使句**（Use..., Always..., Never...）
- **解释 Why** 而不是只给硬性规则
- **使用 ❌/✅ 对照** 展示常见错误
- **保持简洁**：删除任何不能让模型做出更好决策的内容
- **避免过度约束**：不要写 "Always do exactly these 3 steps"，而是给决策树或灵活流程

---

## 4. 常用内容模式

### Quick Reference 表格
适合任务 → 工具/方法的快速映射。

### Decision Tree
适合需要根据情况选择不同方法的工作流。

### CRITICAL / IMPORTANT 标记
用于强调关键规则和常见错误。

### 变量占位符示例
帮助用户理解如何使用代码模板。

---

## 5. 最终检查清单

写完或审查一个 skill 后，必须检查：

- [ ] **description** 是否明确说明了触发场景？是否足够 pushy？
- [ ] 是否有 **Quick Reference** 或决策树帮助快速定位？
- [ ] 是否有 **❌/✅ 模式** 展示常见错误？
- [ ] 祈使句是否足够清晰？是否解释了 "why"？
- [ ] SKILL.md 是否超过 500 行？是否需要拆分到 references/？
- [ ] 是否有 **Next Steps** 指向更详细的参考文档？
- [ ] examples/ 和 references/ 是否被合理使用？

---

## 6. 审查时重点关注的 5 个维度

1. **触发机制** — description 是否覆盖了用户所有可能的说法？
2. **结构清晰度** — 是否使用了 Progressive Disclosure？主文件是否过长？
3. **示例质量** — 是否有可直接复制的代码/模板？是否用 ❌/✅ 说明？
4. **风格一致性** — 是否统一使用祈使句 + 解释 why？
5. **边界明确** — 是否说明了 "不要做什么"？

---

## 7. 迭代优化建议

- 第一轮：只挑 **3~5 个最致命** 的问题
- 每轮只改一个方向（触发 / 结构 / 风格）
- 每次推荐都要引用具体例子（来自 examples/）
- 用户确认后才输出完整新版 SKILL.md

---

**使用本文件时**：这是你的唯一规则书。所有审查都必须基于以上 7 节内容。
