import type { Plugin } from "@opencode-ai/plugin"

export const SessionLogger: Plugin = async ({ $, directory }) => {
  return {
    event: async ({ event }) => {
      if (event.type === "session.created") {
        const sessionID = event.properties.info.id
        const workspaceDir = `${directory}/.opencode/Synapse-Workspace`
        await $`mkdir -p ${workspaceDir}`.quiet()
        await $`echo ${sessionID} > ${workspaceDir}/session-id.txt`.quiet()
      }
    },
  }
}
