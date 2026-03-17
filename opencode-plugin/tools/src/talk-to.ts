import { tool, type ToolDefinition } from "@opencode-ai/plugin"
import { SubSession } from '../store'
import { OpencodeClient } from "@opencode-ai/sdk"
import { useStore } from "../store"

const toolDescription = `
# 工具介绍

Synapse 与团队成员之间的**通信工具**，用于向员工发送消息。

**可以发送的内容**：
- 派发任务指令
- 提供背景信息
- 询问问题
- 给出反馈或纠正方向
- 闲聊/打招呼（没错，也可以）

**核心特点**：
- 每个员工实例独立运行，跟主对话完全隔离
- 员工之间也互相隔离，沟通必须通过你（Synapse）中转
- 发消息是**异步**的，员工会自己处理，不需要等待回复
- 需要获取员工回复时，使用 get-latest-message 工具

**参数选择**：
- member_id：发给指定员工（已知员工 ID，如 oracle-1）
- member_type：新建员工实例并发消息（如 oracle/ares/inspector）

---

# 什么时候使用该工具

当你需要与团队成员进行任何形式的沟通时：

1. **派发任务** - 给员工分配具体的开发、查询、审查任务
2. **提供上下文** - 员工需要额外信息才能更好完成任务
3. **追问/深入** - 员工返回的结果不够详细，继续提问
4. **纠正方向** - 员工理解错了，给出正确指引
5. **闲聊/打招呼** - 员工刚创建时，可以简单打个招呼

简单说：**想跟员工说话，就用这个工具**。

---

# 使用示例

## 示例 1：派发任务

"""
新创建一个 Oracle 去查支付流程
"""
talk-to(member_type="oracle", message="查一下支付模块的完整流程：从用户点击支付按钮开始，到后端接收到回调的整个链路")

## 示例 2：提供背景信息

"""
已有的 Oracle-1 正在查东西，补充一些额外信息
"""
talk-to(member_id="oracle-1", message="补充一下：后端服务用的是 Java，数据库是 MySQL，第三方支付是支付宝")

## 示例 3：深入追问

"""
员工返回的结果太浅，继续深挖
"""
talk-to(member_id="oracle-1", message="刚才的查询结果不够详细，请继续查一下 Session 是怎么存储的，有没有用到 Redis")

## 示例 4：纠正方向

"""
员工理解错了，纠正一下
"""
talk-to(member_id="oracle-1", message="我说的不是登录流程，是支付流程！重新查支付相关的代码")

## 示例 5：质量审查

"""
派给 Inspector 做 code review
"""
talk-to(member_type="inspector", message="帮我 review 刚写的用户权限模块，重点检查：1) 是否有安全漏洞 2) 错误处理是否完善")

## 示例 6：批量操作

"""
派给 Ares 做批量修改
"""
talk-to(member_type="ares", message="把 src/utils 目录下所有 .ts 文件的 console.log 删掉")

## 示例 7：闲聊/打招呼

talk-to(member_type="oracle", message="哥，最近过得咋样")

---

# 注意事项

- 发消息是异步的，不需要等员工回复
- 员工忙碌时无法继续发送消息
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