import { Event } from '../types'
import ready from './ready'
import interactionCreate from './interactionCreate'
import { helpEvent } from '../commands/util/help'

// Assign the events into an array
const events: Event<any>[] = [
  interactionCreate,
  ready,
  helpEvent,
]

export default events