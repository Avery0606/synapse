# 优秀 AGENTS.md 示例特征提炼

本文件从多个高质量项目的 AGENTS.md 中提取共性特征，仅供教学参考。

## 核心共性特征

### 1. 极致的具体性
- 好的 AGENTS.md 从不写“要写清晰的代码”这种空话
- 而是写“永远不要用 else”“永远不要用 as any”“Prometheus 只能改 .md 文件”
- 规则要具体到能直接判断对错的程度

### 2. 强烈的项目特有禁忌
- 每个项目都有近乎偏执的规则
- 这些规则往往是项目长期踩坑后沉淀下来的
- 用强硬语气表达：“绝对不能”“永远不要”“FORBIDDEN”

### 3. 解释“为什么”
- 不仅写规则，还解释背后的原因
- 让 AI 能在新场景下类推，而不是死记硬背

### 4. 分层结构（根 + 子目录）
- 根目录讲全局架构、初始化流程、核心约束
- 子目录的 AGENTS.md 只写该模块特有的规则
- 利用“向上遍历发现”机制实现细粒度上下文

### 5. 可验证 + 可执行
- 很多规则能被工具、CI、hook 直接检查
- 例如“修改后必须执行 typecheck”“不能有 catch(e){}”

### 6. 记录历史债务和决策理由
- 把“为什么这个设计这么奇怪”的来龙去脉写下来
- 避免后人重复踩坑

## 典型片段示例

### 片段 1：架构不变式（来自 oh-my-opencode）
```
## ARCHITECTURE INVARIANTS
- Canonical agent order: Sisyphus → Hephaestus → Prometheus → Atlas.
- Hashline edit + read pairing: Every Read tool output is tagged with LINE#ID content hashes.
- 5-tier hook composition: Session (24) + ToolGuard (16) + Transform (5) + Continuation (7) + Skill (2) = 54 base.
```

### 片段 2：反模式清单（来自 opencode）
```
## ANTI-PATTERNS (BLOCKING)
- Never `as any`, `@ts-ignore`, `@ts-expect-error`.
- Never suppress lint/type errors.
- Never add emojis to code/comments unless user explicitly asks.
- Never commit unless explicitly requested.
```

### 片段 3：技术原理说明（本 skill 强调）
```
## 技术原理
- 自动上下文注入：系统会把 AGENTS.md 内容注入 system prompt
- 向上遍历发现：从当前目录逐级向上查找，支持子目录 AGENTS.md
- 这两个机制共同实现了细粒度、分层的上下文管理
```

## 反面教材特征

- 把 AGENTS.md 写成泛泛的“代码规范”文档
- 只写“要优雅”“要清晰”，不写具体判断标准
- 把所有规则都堆在根目录，不利用子目录分层
- 写了一堆模板化的 checklist，没有项目特有的品味
- 忽略技术原理，只当它是普通文档

---

**教学要点**：优秀的 AGENTS.md 本质是“把默会知识外化 + 利用技术机制实现精准注入”。结构和语气只是表象，理解原理才是关键。
