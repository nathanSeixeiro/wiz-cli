import { GluegunCommand, GluegunToolbox } from 'gluegun'
import { IGoCommand } from '../interfaces'
import { GitHandle, GoHandle } from '../handlers/Go-Handlers'

const command: GluegunCommand = {
  name: 'new-go',
  alias: ['go'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { success, info },
      prompt: { ask },
      requiredName,
    } = toolbox

    const name = parameters.first
    if (!name) {
      requiredName(name)
      return
    }

    const goHandle = new GoHandle(toolbox)
    const gitHandle = new GitHandle(toolbox)

    goHandle.setNext(gitHandle)

    const askInitializeGitRepo = {
      type: 'confirm',
      name: 'initializeGitRepo',
      message: 'Do you want to initialize a Git repository?',
    }

    const { initializeGitRepo } = await ask([askInitializeGitRepo])
    const request: IGoCommand = { name, initializeGitRepo }
    await goHandle.handle(request)
    info(`
      Next:
      $ cd ${name}
      $ npm run dev
    `)
    success('Done! Generated your new project setup!!')
  },
}

module.exports = command
