import { SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'
import ms from 'ms'

const meta = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Displays the bot\'s latency.')

export default command(meta, ({ interaction }) => {
    interaction.reply({ content: `Pong! Latency is ${ms(interaction.client.ws.ping)}ms!`, ephemeral: true })
})