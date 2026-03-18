const template = `
请根据当前会话，判断项目内容是否有相关的 AGENTS.md 文件需要更新或优化。

请重点关注以下几个方面：
1. 是否有关键目录变更
2. 是否有关键业务知识新增或变更
3. 是否有新增关键开发流程
4. 是否有新增关键约束

优化前请和我确认优化内容，确认后方可进行修改。
`;

const command = {
  description: "自动优化项目中需要变更的 AGENTS.md 文件",
  template,
};

export default command;
