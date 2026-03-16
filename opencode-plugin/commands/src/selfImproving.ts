const template = `
请根据当前会话，判断项目内容是否有相关的 AGENTS.md 文件需要更新或优化。

优化前请和我确认优化内容，确认后方可进行修改。
`

const command = {
    description: "自动优化项目中需要变更的 AGENTS.md 文件",
    template,
}

export default command
