import { GatewayIntentBits, Partials } from 'discord.js'
import SlimerClient from './CustomClient'
import { registerEvents } from '../utils'
import events from '../events'
import keys from '../keys'

const client = new SlimerClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [
        Partials.Channel
    ]
})

registerEvents(client, events)

client.login(keys.clientToken)
    .catch((err) => {
        console.error('[Login Error] ', err)
        process.exit(1)
    })
