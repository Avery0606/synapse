import { type Plugin } from "@opencode-ai/plugin"
import { type Config } from "@opencode-ai/sdk"
import { createSynapseTeam } from "./agents"
import { SynapseCommand } from "./commands"

export const SynapseTeamCreator: Plugin = async () => {
  // 声明Synapse Agents Team
  function defineSynapseTeamAgents(config: Config) {
    const team = createSynapseTeam()
    Object.keys(team).forEach((agentName) => {
      if (config.agent) {
        config.agent[agentName as keyof typeof team] = team[agentName]
      }
    })
  }

  // 声明自定义Synapse指令
  function defineSynapseCommand(config: Config) {
    Object.keys(SynapseCommand).forEach((commandName) => {
      if (config.command) {
        config.command[commandName as keyof typeof SynapseCommand] = SynapseCommand[commandName as keyof typeof SynapseCommand]
      }
    })
  }

  return {
    "config": async (config) => {
      defineSynapseTeamAgents(config)
      defineSynapseCommand(config)
    }
  }
}
