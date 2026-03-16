import { type AgentConfig } from "@opencode-ai/sdk"
import { createSynapse } from './src/synapse'
import { createOracle } from './src/oracle'
import { createAres } from './src/ares'
import { createInspector } from './src/inspector'

export function createSynapseTeam(directory: string): { [key: string]: AgentConfig } {
    return {
        "synapse": createSynapse(),
        "oracle": createOracle(directory),
        "ares": createAres(),
        "inspector": createInspector()
    }
}
