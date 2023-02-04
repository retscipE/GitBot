import { Keys } from '../types'

const keys: Keys = {
    clientToken: process.env.CLIENT_TOKEN ?? 'nil',
    testGuild: process.env.TEST_GUILD ?? 'nil',
    mongoDBUri: process.env.MONGO_DB ?? 'nil',
    inviteLink: process.env.INVITE_LINK ?? 'nil',
}

// Check if an environment variable is defined
if (Object.values(keys).includes('nil'))
    throw new Error("Not all ENV variables are defined!")

export default keys
