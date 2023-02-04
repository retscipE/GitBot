import { Client, ClientOptions, Collection, Guild } from 'discord.js'

export default class CustomClient extends Client {
    constructor(options: ClientOptions) { super(options) }

    public cooldown = new Collection<string, number>()
}