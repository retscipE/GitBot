import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js"

async function Reply(interaction: ChatInputCommandInteraction, message?: string, emoji?: string, embeds?: EmbedBuilder[], ephemeral?: boolean) {
    try {
        if (emoji) {
            return await interaction.reply({ content: `${emoji} | ${message}`, embeds: embeds, ephemeral: ephemeral })
        } else {
            return await interaction.reply({ content: message, embeds: embeds, ephemeral: ephemeral })
        }
    } catch (error) {
        console.log(error)
    }
}

async function EditReply(interaction: ChatInputCommandInteraction, message?: string, emoji?: string, embeds?: EmbedBuilder[]) {
    try {
        if (emoji) {
            return await interaction.editReply({ content: `${emoji} | ${message}`, embeds: embeds })
        } else {
            return await interaction.editReply({ content: message, embeds: embeds })
        }
    } catch (error) {
        console.log(error)
    }
}

export { Reply, EditReply }