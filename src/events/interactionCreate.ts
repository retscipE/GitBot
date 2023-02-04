import commands from '../commands'
import { Command } from '../types'
import { event, Reply, EditReply } from '../utils'
import ms from 'ms';

// Maps the commands into a simple to use array
const allCommands = commands.map(({ commands }) => commands).flat()
const allCommandsMap = new Map<string, Command>(
  allCommands.map((c) => [c.meta.name, c])
)

// Create an event that runs when a slash command is detected by the client
export default event('interactionCreate', async (
  {
    log,
    client,
  },
  interaction,
) => {
    if (!interaction.isChatInputCommand()) return;

    try {
        const cmdName = interaction.commandName;
        const command = allCommandsMap.get(cmdName);

        if (!command) throw new Error('Command not found.')

        if (command.inTesting && interaction.channel!.id !== "1062804875773214791") {
            await interaction.reply({ content: `This command is in testing and must be used in the testing commands channel within the Support Server!`, ephemeral: true })
        } else {
            if (command.cooldown) {
                if (client.cooldown.has(`${interaction.user.id}-${interaction.commandName}`)) {
                    interaction.reply({ 
                        content: `You are on cooldown for this command! ` + ms(client.cooldown.get(`${interaction.user.id}-${interaction.commandName}`)! - Date.now(), { long: true }) + " left.",
                        ephemeral: true
                    })
                    return
                }
        
                await command.exec({
                    client,
                    interaction,
                    log(...args) {
                        log(`[${command.meta.name}]`, ...args)
                    },
                })
                client.cooldown.set(`${interaction.user.id}-${interaction.commandName}`, Date.now() + command.cooldown)
        
                setTimeout(() => {
                    client.cooldown.delete(`${interaction.user.id}-${interaction.commandName}`)
                }, command.cooldown)
            } else {
                await command.exec({
                    client,
                    interaction,
                    log(...args) {
                        log(`[${command.meta.name}]`, ...args)
                    },
                })
            }
        }
        
    } catch (error) {
        log('[Command Error] ', error)

        if (interaction.deferred) {
            EditReply(interaction, "Something went wrong! Please try again later.", "❌")
        }

        Reply(interaction, "Something went wrong! Please try again later.", "❌")
    }
})