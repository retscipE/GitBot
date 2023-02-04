import {
    Command,
    CommandCategory,
    CommandExec,
    CommandMeta
  } from '../types'
  
  // Create a function that takes the meta data and the execution and merges into a command
  export function command(meta: CommandMeta, exec: CommandExec, cooldown?: number, inTesting?: boolean): Command {
    return {
      meta,
      exec,
      cooldown,
      inTesting
    }
  }
  
  // Create function to assign commands into a category
  export function category(name: string, description: string, commands: Command[]): CommandCategory {
    return {
      name,
      commands,
      description
    }
  }