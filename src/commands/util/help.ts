import { ActionRowBuilder, EmbedBuilder, SlashCommandBuilder, StringSelectMenuBuilder } from 'discord.js'
import { command, event } from '../../utils'

import categories from '..'

const meta = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Show all the commands within the bot");

const helpCommand = command(meta, ({ interaction }) => {
  const embed = new EmbedBuilder()
    .setColor("Navy")
    .setAuthor({
      name: "<your bot> Help Menu",
      iconURL: interaction.client.user.displayAvatarURL(),
    });

  const menu = new StringSelectMenuBuilder()
    .setCustomId("help_select_menu")
    .setPlaceholder("No menu selected")
    .setMaxValues(1)
    .setMinValues(1);

  categories.forEach((category) => {
    menu.addOptions([
      {
        label: category.name,
        description: category.description ?? "No description provided",
        value: `${category.name}_option`
      }
    ])
    embed.addFields(
      { name: `${category.name}`, value: `${category.commands.length} cmds`, inline: true }
    )
  })
  
  const row = new ActionRowBuilder<StringSelectMenuBuilder>()
    .addComponents(
      menu
    )

  interaction.reply({ components: [row], embeds: [embed] })
})

const helpEvent = event(
  "interactionCreate",
  async ({ log, client }, interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (!(interaction.customId === "help_select_menu")) return;

  const embed = new EmbedBuilder()
    .setColor("Navy")
    .setAuthor({ name: "<your bot> Help Menu", iconURL: interaction.client.user.displayAvatarURL() })

  categories.forEach((category) => {
    if (interaction.values[0] === `${category.name}_option`) {
      embed
        .setTitle(`${category.name} commands`)
      category.commands.forEach((cmd) => {
        embed
          .addFields(
            { name: `${cmd.meta.name}`, value: `${cmd.meta.description}` }
          )
      })
    }
  })

  await interaction.reply({ embeds: [embed], ephemeral: true })
})

export { helpCommand, helpEvent }