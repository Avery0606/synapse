import { existsSync } from "fs"
import { type Plugin, tool, type ToolDefinition } from "@opencode-ai/plugin"
import { type Config } from "@opencode-ai/sdk"
import { SynapseTeam } from "./agents"
import { SynapseCommand } from "./commands"

export const SynapseTeamCreator: Plugin = async ({ $, directory, client }) => {
  // 工作区根目录
  const workspaceDir = `${directory}/.opencode/Synapse-Workspace`

  /**
   * 检查指定 session 的工作区目录是否已存在
   * @param sessionId - Session ID
   * @returns 目录存在返回 true，否则返回 false
   */
  function checkWorkspaceExists(sessionId: string): boolean {
    const sessionDir = `${workspaceDir}/${sessionId}`
    const result = existsSync(sessionDir)
    return result
  }

  /**
   * 创建指定 session 的工作区目录及四个 agent 记录文件
   * @param sessionId - Session ID
   */
  async function createWorkspace(sessionId: string): Promise<void> {
    const sessionDir = `${workspaceDir}/${sessionId}`
    await $`mkdir -p ${sessionDir}`.quiet()

    // 为每个 agent 创建独立的记录文件
    await $`echo "# Key-findings" > ${sessionDir}/key-findings.md`.quiet()
  }

  // 自定义工具 - synapse任务分发（异步）
  function createSynapseTaskDelegateTool(): ToolDefinition {
    const availableMember = new Set(['mnemosyne', 'oracle'])
    return {
      description: "提供给Synapse用于任务分发",
      args: {
        teamMemberName: tool.schema.string().describe(`需要调用的团队员工名称：${Array.from(availableMember).join()}`),
        taskDetails: tool.schema.string().describe('任务详情'),
        taskTitle: tool.schema.string().describe('任务标题')
      },
      execute: async (args, context) => {
        if (context.agent !== "synapse") {
          return "无该工具调用权限"
        }

        const { taskDetails, taskTitle } = args
        const teamMemberName = String(args.teamMemberName).toLowerCase()
        const parentSessionId = context.sessionID

        if (teamMemberName === 'ares') {
          return `请使用task工具给该员工分配任务`
        }

        if (!availableMember.has(String(teamMemberName))) {
          return `员工不存在，可用员工有 ${Array.from(availableMember).join()}`
        }

        // 创建子任务
        const subTaskResult = await client.session.create({
          body: {
            parentID: parentSessionId,
            title: String(taskTitle)
          },
          query: { directory }
        })

        if (subTaskResult.error) {
          return `任务分发失败，请重试，Error: ${subTaskResult.error}`
        }

        // 子任务sessionId
        const subTaskSessionId = subTaskResult.data.id

        // 告知子员工任务详情
        client.session.promptAsync({
          body: {
            agent: String(teamMemberName),
            parts: [{
              type: "text",
              text: `[sessionId]: ${parentSessionId}\n${taskDetails}`,
            }]
          },
          path: { id: subTaskSessionId }
        })

        const taskOverview =
          `[任务名称]: ${taskTitle}\n` +
          `[员工]: ${teamMemberName}\n` +
          `[任务ID]: ${subTaskSessionId}`

        // 轮询任务是否完成
        Promise.resolve().then(() => {
          new Promise((resolve) => {
            let timer = setInterval(async () => {
              const currentSessionsStatus = await client.session.status()
              const subTaskStatus = currentSessionsStatus.data?.[subTaskSessionId]
              if (!subTaskStatus || subTaskStatus.type === "idle") {
                clearInterval(timer)
                resolve(true)
              }
            }, 5000)
          }).then(() => {
            client.session.promptAsync({
              body: {
                agent: "synapse",
                parts: [{
                  type: "text",
                  text: "<teamMember-task-complete>\n" +
                    `${taskOverview}\n` +
                    "请使用synapse-task-query工具查询任务详情\n" +
                    "</teamMember-task-complete>"
                }]
              },
              path: { id: parentSessionId },
            })
          }).catch(() => {
            client.tui.showToast({
              body: {
                title: "Error",
                message: `轮询出错：\n${taskOverview}`,
                variant: "error"
              }
            })
          })
        })

        return `任务分发成功，后续会有系统提醒该任务是否完成，在此期间可以继续分发其他任务或者与用户互动\n${taskOverview}`
      }
    }
  }

  // 自定义工具 - 查询synapse团队具体任务完成详情
  function createSynapseTaskQueryTool(): ToolDefinition {
    return {
      description: "用于查询Synapse团队某个任务执行详情",
      args: {
        task_id: tool.schema.string().describe("需要查询的任务ID")
      },
      execute: async (args, context) => {
        const { task_id } = args

        // 判断任务是否已执行完成
        const allSessionsStatus = await client.session.status();
        const currentSessionsStatus = allSessionsStatus.data?.[String(task_id)]
        if (currentSessionsStatus && currentSessionsStatus.type !== "idle") {
          return "任务执行中，请耐心等待系统提示后再进行任务详情查询，在此期间你可以与用户互动"
        }

        const taskMessages = await client.session.messages({ path: { id: String(task_id) } })
        return taskMessages.data?.filter(({ info }) => info.role === "assistant").map(({ parts }) => {
          return parts
            .filter(part => part.type === "text" || part.type === "reasoning")
            .map(part => part.text).join('\n')
        }).join('\n') ?? "任务无结果"
      }
    }
  }

  // 声明Synapse Agents Team
  function defineSynapseTeamAgents(config: Config) {
    Object.keys(SynapseTeam).forEach((agentName) => {
      if (config.agent) {
        config.agent[agentName as keyof typeof SynapseTeam] = SynapseTeam[agentName as keyof typeof SynapseTeam]
      }
    })
  }

  // 声明自定义Synapse指令
  function defineSynapseCommand(config: Config) {
    Object.keys(SynapseCommand).forEach((commandName) => {
      if (config.command) {
        config.command[commandName as keyof typeof SynapseCommand] = SynapseCommand[commandName as keyof typeof SynapseCommand]
      }
    })
  }

  return {
    "tool": {
      "synapse-task-delegate": createSynapseTaskDelegateTool(),
      "synapse-task-query": createSynapseTaskQueryTool(),
    },
    "config": async (config) => {
      defineSynapseTeamAgents(config)
      defineSynapseCommand(config)
    },
    "chat.message": async (input, output) => {
      const { sessionID, agent } = input

      if (agent?.toLowerCase() !== 'synapse') return

      // 检查工作区是否已创建，避免重复创建
      if (checkWorkspaceExists(sessionID)) return

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
