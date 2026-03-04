import type { Plugin } from "@opencode-ai/plugin"

// Agent 团队成员列表（小写，用于大小写不敏感匹配）
const AGENT_TEAM = new Set(["synapse", "oracle", "mnemosyne", "ares"])

export const SynapseTeamCreator: Plugin = async ({ $, directory }) => {
  // 工作区根目录
  const workspaceDir = `${directory}/.opencode/Synapse-Workspace`

  /**
   * 检查指定 session 的工作区目录是否已存在
   * @param sessionId - Session ID
   * @returns 目录存在返回 true，否则返回 false
   */
  async function checkWorkspaceExists(sessionId: string): Promise<boolean> {
    const sessionDir = `${workspaceDir}/session-${sessionId}`
    const result = await $`test -d ${sessionDir} && echo "yes" || echo "no"`.text()
    return result.trim() === "yes"
  }

  /**
   * 创建指定 session 的工作区目录及四个 agent 记录文件
   * @param sessionId - Session ID
   */
  async function createWorkspace(sessionId: string): Promise<void> {
    const sessionDir = `${workspaceDir}/session-${sessionId}`
    await $`mkdir -p ${sessionDir}`.quiet()

    // 为每个 agent 创建独立的记录文件
    const files = ["Synapse", "Mnemosyne", "Oracle", "Ares"]
    for (const file of files) {
      await $`echo "#Key-findings" > ${sessionDir}/${file}.md`.quiet()
    }
  }

  return {
    "chat.message": async (input, output) => {
      const { sessionID, agent } = input

      // 检查 agent 是否属于团队成员（大小写不敏感）
      if (!AGENT_TEAM.has(agent?.toLowerCase())) return

      // 检查工作区是否已创建，避免重复创建
      if (await checkWorkspaceExists(sessionID)) return

      // 创建工作区目录和文件
      await createWorkspace(sessionID)

      // 将 sessionId 注入消息，传递给 AI
      output.parts.push({
        id: `synapse-session-${sessionID}`,
        sessionID,
        messageID: input.messageID || "",
        type: "text" as const,
        text: `[Synapse-Team Session: ${sessionID}]`,
        synthetic: true,
      })
    },
  }
}
