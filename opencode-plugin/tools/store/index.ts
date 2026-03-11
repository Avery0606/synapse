export interface SubSession {
  status: 'idle' | 'busy'
  member_type: 'mnemosyne' | 'oracle' | 'ares'
  member_id: string,
  sessionId: string
  parentSessionId: string
}

const subSessionsStore: Record<string, SubSession> = {}

export const useStore = () => {
  return { subSessionsStore }
}
