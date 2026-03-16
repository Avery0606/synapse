export interface SubSession {
  status: 'idle' | 'busy'
  member_type: 'oracle' | 'ares' | 'inspector'
  member_id: string,
  sessionId: string
  parentSessionId: string
}

// parentSessionId -> member_id -> SubSession
const subSessionsStore: Record<string, Record<string, SubSession>> = {}

export const useStore = () => {
  return { subSessionsStore }
}
