import { tool, type ToolDefinition } from "@opencode-ai/plugin"
import { SubSession } from '../store'
import { OpencodeClient } from "@opencode-ai/sdk"
import { useStore } from "../store"

const toolDescription = `
用于给指定员工发送聊天消息，例如指派该员工干活，闲聊，让员工返工以前的任务等

使用优先级：
1. 每次调用此工具时，优先思考是否已有员工正在做类似的事情
2. 有的话使用 member_id 继续派活（如 oracle-1、ares-2）
3. 没有才使用 member_type 新建一个员工实例

使用示例：
想要继续派活给已有员工时：传入member_id和message
talk-to(member_id=oracle-1,message=这个查找代码的任务做的不好，请继续深入查找)
会继续使用该员工处理

想要新建一个员工实例时：仅传入member_type和message
talk-to(member_type=oracle,message=帮忙查找下代码实现)
会返回一个新的员工ID（如 oracle-2）
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
      member_type: tool.schema.string().describe('员工类型：oracle|mnemosyne|ares').optional(),
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
        const targetSession = subSessionsStore[member_id]

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
      const availableMemberType = new Set(['mnemosyne', 'oracle', 'ares'])
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
      const seenMemberIdList = Object.keys(subSessionsStore).filter(key => key.includes(member_type))
      const newMemberId = `${member_type}-${seenMemberIdList.length + 1}`;
      subSessionsStore[newMemberId] = {
        status: 'busy',
        member_type,
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