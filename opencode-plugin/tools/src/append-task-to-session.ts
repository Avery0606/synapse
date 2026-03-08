import { tool, type ToolDefinition } from "@opencode-ai/plugin"
import { OpencodeClient } from "@opencode-ai/sdk"
import { useStore } from "../store"

// 在以前会话追加任务
export function createAppendTaskToSessionTool({ client }: { client: OpencodeClient }
): ToolDefinition {
  return {
    description: "用于在历史已有会话追加新的任务，当需要创建一个与历史子会话有关联的任务时使用此工具",
    args: {
      taskDetails: tool.schema.string().describe('任务详情'),
      taskTitle: tool.schema.string().describe('任务标题'),
      subSessionId: tool.schema.string().describe('要追加任务的子会话ID，用于指定在哪个已有会话里追加新任务')
    },
    execute: async (args, context) => {
      // 权限校验
      if (context.agent !== "synapse") {
        return "无该工具调用权限"
      }

      const { taskDetails, taskTitle } = args
      const subSessionId = String(args.subSessionId ?? '')
      const { subSessionsStore } = useStore()

      // 有subSessionId，判断subSessionId是否合法，以及会话是否空闲
      const targetSubSessionInstance = subSessionsStore[subSessionId]
      if (!targetSubSessionInstance) {
        return '子任务会话不存在'
      }
      if (targetSubSessionInstance.status !== 'idle') {
        return '子任务会话忙碌中，禁止继续添加任务'
      }

      targetSubSessionInstance.tasks.push(taskTitle)
      targetSubSessionInstance.status = "busy"

      // 告知子员工任务详情
      client.session.promptAsync({
        body: {
          agent: String(targetSubSessionInstance.member_type),
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