import { category } from '../../utils'
import repoinfo from './repoinfo'
import repositories from './repositories'

export default category("github", "Commands to access GitHub and get information from GitHub", [
    repoinfo,
    repositories
])