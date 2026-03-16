import { tool, type ToolDefinition } from "@opencode-ai/plugin"
import { SubSession } from '../store'
import { OpencodeClient } from "@opencode-ai/sdk"
import { useStore } from "../store"

const toolDescription = `
给团队成员发消息。闲聊、派活、让员工返工都行。

每个员工实例是独立跑的，跟主聊天完全隔离 —— 他看不到你们的对话，有啥背景直接发给他。

发完消息，他干他的，你干你的，最后回来汇报。

优先级：
1. 先想有没有员工正在做类似的事
2. 有 → 用 member_id 继续聊（如 oracle-1）
3. 没有 → 用 member_type 新建实例（如 oracle）

示例：
- member_id=oracle-1, message=这个查找做得不好，请继续深入 → 继续用现有员工
- member_type=oracle, message=帮忙查下代码实现 → 新建员工实例
`

// 创建异步任务
export function createTalkToTool(
  { client, directory }:
    {
      client: OpencodeClient,
      directory: string
    }
): ToolDefinition {
  return {
    description: toolDescription,
    args: {
      member_type: tool.schema.string().describe('员工类型：oracle|ares|inspector').optional(),
      message: tool.schema.string().describe('想要发送的消息'),
      member_id: tool.schema.string().describe('员工ID：如oracle-1|oracle-2|oracle-3').optional()
    },
    execute: async (args: { member_type: string, message: string, member_id: string }, context) => {
      if (context.agent !== 'synapse') {
        return '无该工具调用权限'
      }

      const { member_type, member_id, message } = args
      const parentSessionId = context.sessionID
      const { subSessionsStore } = useStore()

      // 向已有员工发送消息
      if (member_id?.length) {
        const targetSession = subSessionsStore[parentSessionId]?.[member_id]

        // 子员工不存在
        if (!targetSession) {
          return '员工ID不存在，请重新传入存在的员工ID或仅传入member_type新建员工实例'
        }

        // 子员工忙碌中
        if (targetSession.status !== "idle") {
          return '该员工忙碌中，请耐心等待员工回复后再发送消息'
        }

        // 发送消息
        targetSession.status = "busy"
        client.session.promptAsync({
          body: {
            agent: targetSession.member_type,
            parts: [{
              type: "text",
              text: message,
            }]
          },
          path: { id: targetSession.sessionId }
        })

        return `[员工ID] ${member_id} 消息已发送成功`
      }

      // 新建员工实例并发送消息
      const availableMemberType = new Set(['oracle', 'ares', 'inspector'])
      if (!availableMemberType.has(member_type.toLowerCase())) {
        return `员工类型不存在，可用员工类型有 ${Array.from(availableMemberType).join()}`
      }

      const newMessageResult = await client.session.create({
        body: {
          parentID: parentSessionId,
        },
        query: { directory }
      })

      if (newMessageResult.error) {
        return `新会话创建失败，请重试，Error: ${newMessageResult.error}`
      }

      const subSessionId = newMessageResult.data.id
      // 确保当前 parentSessionId 有对应的 map
      if (!subSessionsStore[parentSessionId]) {
        subSessionsStore[parentSessionId] = {}
      }

      const seenMemberIdList = Object.keys(subSessionsStore[parentSessionId]).filter(key => key.includes(member_type))
      const newMemberId = `${member_type}-${seenMemberIdList.length + 1}`;
      subSessionsStore[parentSessionId][newMemberId] = {
        status: 'busy',
        member_type,
        member_id: newMemberId,
        sessionId: subSessionId,
        parentSessionId
      } as SubSession

      // 告知子员工任务详情
      client.session.promptAsync({
        body: {
          agent: member_type,
          parts: [{
            type: "text",
            text: message,
          }]
        },
        path: { id: subSessionId }
      })

      return `[员工ID] ${newMemberId} 消息已发送成功`
    }
  }
}