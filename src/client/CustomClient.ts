import { Client, ClientOptions, Collection, Guild } from 'discord.js'
import { Octokit } from 'octokit'
import keys from '../keys';

export default class CustomClient extends Client {
    constructor(options: ClientOptions) { super(options) }

    public cooldown = new Collection<string, number>();
    public octokit = new Octokit({
        auth: keys.githubApiKey
    })
    public async requestRetry(route: string, parameters: any) {
        try {
          const response = await this.octokit.request(route, parameters);
          return response
        } catch (error: any) {
            if (error.response && error.status === 403 && error.response.headers['x-ratelimit-remaining'] === '0') {
                const resetTimeEpochSeconds = error.response.headers['x-ratelimit-reset'];
                const currentTimeEpochSeconds = Math.floor(Date.now() / 1000);
                const secondsToWait = resetTimeEpochSeconds - currentTimeEpochSeconds;
                console.log(`You have exceeded your rate limit. Retrying in ${secondsToWait} seconds.`);
                setTimeout(this.requestRetry, secondsToWait * 1000, route, parameters);
            } else {
                console.error(error);
            }
        }
    }
}