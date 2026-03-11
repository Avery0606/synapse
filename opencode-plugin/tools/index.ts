import { createTalkToTool } from './src/talk-to'
import { createGetLatestMessageTool } from './src/get-latest-message'
import { OpencodeClient } from "@opencode-ai/sdk"
import { useStore } from './store'

// 自定义工具注册
export const createTools = ({ client, directory }:
  {
    client: OpencodeClient,
    directory: string
  }) => {

  // 创建轮询任务
  loopUpdateSubSessionStatus({ client })

  return {
    "talk-to": createTalkToTool({ client, directory }),
    "get-latest-message": createGetLatestMessageTool({ client })
  }
}

// 定时循环更新所有子会话状态 5000ms 一次
function loopUpdateSubSessionStatus({ client }: { client: OpencodeClient }) {
  const loopTime = 5000;
  const { subSessionsStore } = useStore()
  setInterval(async () => {
    const allSessionsStatus = await client.session.status();
    Object.keys(subSessionsStore).forEach(member_id => {
      const targetSessionInstance = subSessionsStore[member_id]
      const oldStatus = targetSessionInstance.status
      const newSessionStatusResp = allSessionsStatus.data?.[targetSessionInstance.sessionId]
      let newStatus: 'idle' | 'busy';
      if (!newSessionStatusResp || newSessionStatusResp.type === 'idle') {
        newStatus = 'idle'
      } else {
        newStatus = 'busy'
      }
      targetSessionInstance.status = newStatus

      // 任务完成，发送消息
      if (oldStatus === 'busy' && newStatus === 'idle') {
        client.session.promptAsync({
          body: {
            agent: "synapse",
            parts: [{
              type: "text",
              text: `[来自系统提示(非用户输入)] ${member_id} 回复最新消息啦\n请使用get-latest-message(member_id=${member_id})查看最新回复消息`
            }]
          },
          path: { id: targetSessionInstance.parentSessionId },
        })
      }
    })
  }, loopTime)
}