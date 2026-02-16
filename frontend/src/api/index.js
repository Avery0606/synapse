import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 300000  // 5分钟超时
})

// 初始化
export function init() {
  return api.get('/init')
}

// 添加记忆
export function addMemories(workSpace, content, metadata = null) {
  return api.post('/addMemories', {
    workSpace,
    content,
    metadata
  })
}

// 获取记忆 (搜索或获取所有)
export function getMemories(workSpace, query = null, threshold = 0, category = null) {
  return api.post('/getMemories', {
    workSpace,
    query,
    threshold,
    category
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
