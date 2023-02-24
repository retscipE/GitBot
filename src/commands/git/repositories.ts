import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'
import ms from 'ms'

const meta = new SlashCommandBuilder()
  .setName('repositories')
  .setDescription('Get a list of repositories from a GitHub user.')
  .addStringOption(option =>
    option
        .setName("username").setDescription("The username of the user you want to check.").setRequired(true)
    )

export default command(meta, async ({ interaction, client }) => {
    await interaction.deferReply()  
    const repoOwner = interaction.options.getString("username", true)
    try {
        const response = await client.requestRetry("GET /users/{owner}/repos", {
            owner: repoOwner
        })

        const data: any[] = response?.data ?? "Error"
        const repositories = data.map(repository => repository.html_url)
        const repoName = data.map(repository => repository.name)
        const embed = new EmbedBuilder()
            .setTitle(`Repositories for ${repoOwner}`)
            .setColor("DarkGrey")
        for (const [index, repo] of repositories.entries()) {
            if (index === 25) break;
            embed.addFields(
                { name: repoName[index], value: repo, inline: true }
            )
        }
        await interaction.editReply({ embeds: [embed] })
    } catch(e) {
        console.log(e)
        await interaction.editReply({ content: "An error occurred while trying to fetch the repositories." })
    }
})