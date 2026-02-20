import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 300000  // 5分钟超时
})

// 添加记忆
export function addMemories(workSpace, messages, metadata = null) {
  return api.post('/addMemories', {
    workSpace,
    messages,
    metadata
  })
}

// 获取记忆 (搜索或获取所有)
export function getMemories(workSpace, query = null, threshold = 0, metadata = null) {
  return api.post('/getMemories', {
    workSpace,
    query,
    threshold,
    metadata
  })
}

// 更新记忆
export function updateMemory(memoryId, content) {
  return api.post('/updateMemory', {
    memoryId,
    content
  })
}

// 删除记忆
export function deleteMemory(memoryId) {
  return api.post('/deleteMemory', {
    memoryId
  })
}

export default api
