const command = {
    description: "自动优化项目 AGENTS.md（融合 learn 能力，提取 non-obvious learnings）",
    template: `请按照以下 Six-Step Judgment Process 自主维护并更新项目中的 AGENTS.md 文件：

## Core Principle
AGENTS.md 记录的是让未来 AI 能独立工作的**最小必要信息**，不是 changelog，不是个人笔记，也不是临时调试记录。

## Six-Step Judgment Process

**Step 0**：阅读 what is AGENTS.md

**Step 1**: 读取项目中所有现有的 AGENTS.md 文件，理解当前状态。

**Step 2**: 分析当前任务路径。回顾完整对话历史，提取：
- 任务执行路径（先做了什么、用了什么工具/方法）
- 错误与绕路（不必要的工作、违反现有规范、重试、非最优顺序）
- 每项是否值得记录（更强的 AI 是否会犯同样错误）
- **用户反馈信号**：是否存在用户指责、批评、骂、失望表达；开发完成后用户额外提出的要求；需要永久记住的显式或隐式事项

**Step 2.5（Learning Extraction）**: 从 Step 2 的回顾中自然提炼 non-obvious learnings：
- 隐藏的文件/模块关系或执行路径差异
- 误导性错误信息背后的真实原因
- API/工具的 quirks 及有效 workaround
- 非 README 的构建/测试命令或环境变量
- 必须一起变更的文件组合
- 仅因当前能力限制才需要的约束（更强 AI 可能不需要）

仅记录“更强的 AI 仍可能踩坑”的内容，其余忽略。

**Step 3**: 结合当前会话信息与 Step 2 + Step 2.5 的分析，对每个 AGENTS.md 确定需要更新什么、更新内容是什么。特别关注 non-obvious learnings 是否产生新规范或约束。

**Step 4**: 将所需更新总结为初步列表。

**Step 5**: 对总结信息进行反思：
- 这些信息是否可以轻松通过阅读代码获得？如果是，应放在代码注释而非 AGENTS.md。
- 这些信息是否仅因当前能力限制才需要？更强的 AI 可能不需要。
- 如果是噪声或不必要内容，删除以避免退化。

**Step 6**: 按以下精确 Markdown 表格格式输出更新列表：

| AGENTS.md 路径 | 更新章节 | 大致更新内容 |
|---------------|----------|-------------|
| ... | ... | ... |

## Confirmation Requirement
在写入任何更改前，必须先展示更新表格，并获得用户明确批准（“同意”或修正）。此门禁保护文档免受临时调试笔记、个人偏好和一次性工作的过度记录。

## No-Update Situations
如果以下任一为真，则不更新 AGENTS.md：
- 任务仅为临时调试或探索
- 变更仅反映个人偏好
- 变更修复明显 bug 且无新规范
- 细节应属于代码注释
- 信息已存在于现有 AGENTS.md
- 用户反馈仅为情绪宣泄且未产生新规范

## Output Format
始终以生成上述表格结束。在用户批准计划前，不要修改任何 AGENTS.md 文件。`,
}

export default command