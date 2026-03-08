export interface SubSession {
  status: 'idle' | 'busy'
  tasks: any[]
  member_type: 'mnemosyne' | 'oracle' | 'ares'
  sessionId: string
  parentSessionId?: string
}

const subSessionsStore: Record<string, SubSession> = {}

export const useStore = () => {
    return { subSessionsStore }
}
