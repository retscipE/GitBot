import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'
import ms from 'ms'

const meta = new SlashCommandBuilder()
  .setName('repoinfo')
  .setDescription('Get information from a GitHub Repository')
  .addStringOption(option => 
    option
     .setName("repoowner").setDescription("The owner of the repository you want to check.").setRequired(true) 
  )
  .addStringOption(option => 
    option
     .setName("reponame").setDescription("The name of the repository you want to check.").setRequired(true) 
  )

export default command(meta, async ({ interaction, client }) => {
  await interaction.deferReply()  
  
  const repoOwner = interaction.options.getString("repoowner", true)
  const repoName = interaction.options.getString("reponame", true)

  try {
    const response = await client.requestRetry("GET /users/{owner}/repos", {
      owner: repoOwner
    })
    const data: any[] = response?.data ?? "Error"
    const repository = await data.find(repository => repository.full_name === `${repoOwner}/${repoName}`)

    const embed1 = new EmbedBuilder()
      .setTitle(`Repository Info for ${repository.full_name}`)
      .setColor("DarkGrey")
      .setAuthor({ name: repository.owner.login, iconURL: repository.owner.avatar_url, url: repository.owner.html_url })
      .setURL(repository.html_url)
      .setThumbnail(repository.owner.avatar_url)
      .addFields(
        { name: "Description", value: repository.description ?? "No description provided.", inline: false },
        { name: "Language", value: repository.language ?? "No language provided.", inline: true },
        { name: "Stars", value: repository.stargazers_count.toString(), inline: true },
        { name: "Forks", value: repository.forks_count.toString(), inline: true },
        { name: "Open Issues", value: repository.open_issues_count.toString(), inline: true },
        { name: "License", value: repository.license?.name ?? "No license provided.", inline: true },
        { name: "Created At", value: new Date(repository.created_at).toLocaleString(), inline: true },
        { name: "Updated At", value: new Date(repository.updated_at).toLocaleString(), inline: true },
        { name: "Pushed At", value: new Date(repository.pushed_at).toLocaleString(), inline: true },
        { name: "Size", value: `${repository.size} KB`, inline: true },
        { name: "Default Branch", value: repository.default_branch, inline: true },
        { name: "Private", value: repository.private.toString(), inline: true },
        { name: "Fork", value: repository.fork.toString(), inline: true },
        { name: "URL", value: repository.html_url, inline: true },
        { name: "Clone URL", value: repository.clone_url, inline: true },
        { name: "SSH URL", value: repository.ssh_url, inline: true },
        { name: "Git URL", value: repository.git_url, inline: true },
        { name: "Mirror URL", value: repository.mirror_url ?? "No mirror URL provided.", inline: true },
        { name: "Watchers", value: repository.watchers_count.toString(), inline: true },
        { name: "Has Issues", value: repository.has_issues.toString(), inline: true },
        { name: "Has Projects", value: repository.has_projects.toString(), inline: true },
      );

    await interaction.editReply({ embeds: [embed1] })
  } catch (err) {
    console.log(err)
    await interaction.editReply({ content: `Something went wrong... Most likely an incorrect repository name.` })
  }
})