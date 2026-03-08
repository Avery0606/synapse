// 存储所有子会话实例 sessionId - instance
// status: idle || busy
// tasks
// member_type
// sessionId
// parentSessionId
const subSessionsStore = {}

export const useStore = () => {
    return { subSessionsStore }
}