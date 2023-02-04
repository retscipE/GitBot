import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(__dirname, '..', '..', '.env') })

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

import { REST, Routes, APIUser } from 'discord.js'
import commands from '../commands'
import keys from '../keys'

// Map the commands list into a variable for easier management
const body = commands.map(({ commands }) => 
  commands.map(({ meta }) => meta)
).flat()

// Connect to Discord REST api and assign a variable for the REST api
const rest = new REST({ version: '10' }).setToken(keys.clientToken)

async function main() {
  const currentUser = await rest.get(Routes.user()) as APIUser

  const endpoint = process.env.NODE_ENV === 'production'
    ? Routes.applicationCommands(currentUser.id)
    : Routes.applicationGuildCommands(currentUser.id, keys.testGuild)

  rest.put(endpoint, { body: [] })
    .catch(console.error);

  await rest.put(endpoint, { body })

  return currentUser
}

// Run the main function to load the commands into the Discord REST api
main()
  .then((user) => {
    const tag = `${user.username}#${user.discriminator}`
    // Check the environment for if the bot is in production mode (available to public)
    const response = process.env.NODE_ENV === 'production'
      ? `Successfully released commands in production as ${tag}!`
      : `Successfully registered commands for development in ${keys.testGuild} as ${tag}!`

    console.log(response)
  })
  .catch(console.error)