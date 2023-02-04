import { category } from '../../utils'
import ping from './ping'
import { helpCommand } from './help'

export default category("Utility", "Commands to help with utility in your server", [
    ping,
    helpCommand,
])