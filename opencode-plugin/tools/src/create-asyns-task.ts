import { tool, type ToolDefinition } from "@opencode-ai/plugin"
import { OpencodeClient } from "@opencode-ai/sdk"
import { useStore } from "../store"

// 创建异步任务
export function generateCreateAsyncTaskTool(
  { client, directory }:
    {
      client: OpencodeClient,
      directory: string
    }
): ToolDefinition {
  const availableMemberType = new Set(['mnemosyne', 'oracle', 'ares'])
  return {
    description: "用于新任务的创建，当需要创建新任务（与历史已有任务独立的任务），使用此工具",
    args: {
      member_type: tool.schema.string().describe(`需要调用的团队员工类型：${Array.from(availableMemberType).join()}`),
      taskDetails: tool.schema.string().describe('任务详情'),
      taskTitle: tool.schema.string().describe('任务标题'),
    },
    execute: async (args, context) => {
      // 权限校验
      if (context.agent !== "synapse") {
        return "无该工具调用权限"
      }

      const { taskDetails, taskTitle } = args
      const member_type = String(args.member_type ?? '').toLowerCase()
      const parentSessionId = context.sessionID
      const { subSessionsStore } = useStore()

      if (!availableMemberType.has(String(member_type))) {
        return `该员工类型不存在，可用员工类型有 ${Array.from(availableMemberType).join()}`
      }

      // 无指定历史子会话 创建新的子会话任务
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

      const subSessionId = subTaskResult.data.id
      subSessionsStore[subSessionId] = {
        status: 'busy',
        tasks: [taskTitle],
        member_type,
        sessionId: subSessionId,
        parentSessionId
      }

      // 告知子员工任务详情
      client.session.promptAsync({
        body: {
          agent: String(member_type),
          parts: [{
            type: "text",
            text: `${taskDetails}`,
          }]
        },
        path: { id: subSessionId }
      })

      return `[子任务会话ID]: ${subSessionId}\n任务分发成功，后续会有系统提醒该任务是否完成`
    }
  }
}