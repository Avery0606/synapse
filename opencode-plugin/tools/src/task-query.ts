import { tool, type ToolDefinition } from "@opencode-ai/plugin"
import { OpencodeClient } from "@opencode-ai/sdk"
import { useStore, type SubSession } from '../store'

// 自定义工具 - 查询synapse团队具体任务完成详情
export function createTaskQueryTool({ client }: { client: OpencodeClient }): ToolDefinition {
  return {
    description: "用于查询Synapse团队某个任务执行详情",
    args: {
      subSessionId: tool.schema.string().describe("需要查询的子任务会话ID")
    },
    execute: async (args: { subSessionId: string }) => {
      const { subSessionId } = args
      const { subSessionsStore } = useStore();

      // 判断任务是否已执行完成
      const targetSessionInstance: SubSession = subSessionsStore[subSessionId]
      if (!targetSessionInstance) {
        return '任务会话不存在'
      }
      if (targetSessionInstance.status !== "idle") {
        return "请勿频繁查询，任务完成后系统会自动通知"
      }

      const taskMessages = await client.session.messages({ path: { id: String(subSessionId) } })

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
        }).join('\n') ?? "任务无结果"
    }
  }
}