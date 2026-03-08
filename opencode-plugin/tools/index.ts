import { generateCreateAsyncTaskTool } from './src/create-asyns-task'
import { createAppendTaskToSessionTool } from './src/append-task-to-session'
import { createTaskQueryTool } from './src/task-query'
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
    "synapse-create-async-task": generateCreateAsyncTaskTool({ client, directory }),
    "synapse-append-task-to-session": createAppendTaskToSessionTool({ client, directory }),
    "synapse-task-query": createTaskQueryTool({ client })
  }
}

// 定时循环更新所有子会话状态 5000ms 一次
function loopUpdateSubSessionStatus({ client }: { client: OpencodeClient }) {
  const loopTime = 5000;
  const { subSessionsStore } = useStore()
  setInterval(async () => {
    const allSessionsStatus = await client.session.status();
    Object.keys(subSessionsStore).forEach(sessionId => {
      const targetSessionInstance = subSessionsStore[sessionId]
      const oldStatus = targetSessionInstance.status
      const newSessionStatusResp = allSessionsStatus.data[sessionId]
      let newStatus;
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
              text: `系统提示：${sessionId} 任务已完成\n请使用synapse-task-query工具查询任务完成详情`,
              synthetic: true
            }]
          },
          path: { id: targetSessionInstance.parentSessionId },
        })
      }
    })
  }, loopTime)
}