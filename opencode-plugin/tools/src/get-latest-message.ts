import { tool, type ToolDefinition } from "@opencode-ai/plugin"
import { OpencodeClient } from "@opencode-ai/sdk"
import { useStore, type SubSession } from '../store'

// 用于查询某个员工的最新回复消息
export function createGetLatestMessageTool({ client }: { client: OpencodeClient }): ToolDefinition {
  return {
    description: "用于查询指定子员工实例最新消息",
    args: {
      member_id: tool.schema.string().describe("需要查询消息的子员工ID，如oracle-1, oracle-2")
    },
    execute: async (args: { member_id: string }) => {
      const { member_id } = args
      const { subSessionsStore } = useStore();

      // 判断任务是否已执行完成
      const targetSessionInstance: SubSession = subSessionsStore[member_id]
      if (!targetSessionInstance) {
        return '任务会话不存在'
      }
      if (targetSessionInstance.status !== "idle") {
        return "请勿频繁查询，任务完成后该员工会自动通知"
      }

      const taskMessages = await client.session.messages({ path: { id: targetSessionInstance.sessionId } })

      // 最新任务消息起点位置
      const lastPromptIndex = Math.max(...taskMessages.data?.map(
        ({ info }, index) => info.role === "user" ? index : -1
      ) ?? [])
      return taskMessages.data?.slice(lastPromptIndex + 1)
        .filter(({ info }) => info.role === "assistant")
        .map(({ parts }) => {
          return parts
            .filter(part => part.type === "text")
            .map(part => part.text).join('\n')
        }).join('\n') ?? "暂无最新消息"
    }
  }
}