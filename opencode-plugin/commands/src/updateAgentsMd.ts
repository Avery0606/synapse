const template = `
# 更新项目 AGENTS.md 文件

## 执行流程

### 第一步：分析需要修改的 AGENTS.md

根据本次会话内容，分析项目中哪些 AGENTS.md 需要修改：
- 分析本次变更涉及哪些目录
- 对比各目录下的 AGENTS.md 已有内容，判断需要修改的章节

### 第二步：呈现分析结果

向用户呈现分析结果：
- 列出需要修改的 AGENTS.md 文件
- 每个文件需要修改的章节及修改原因

### 第三步：用户确认

逐一询问用户是否确认修改，确认后再进行修改。

### 第四步：修改文件

根据用户确认的内容，更新对应的 AGENTS.md 文件。

---

**重要规则**：
- 必须先分析影响，再呈现给用户
- 每次修改前必须先得到用户确认
`

const command = {
    description: "更新项目中需要变更的 AGENTS.md 文件",
    template,
}

export default command
