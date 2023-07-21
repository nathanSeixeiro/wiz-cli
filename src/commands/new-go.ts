import { GluegunCommand, GluegunToolbox } from 'gluegun'
import { INewCommand } from '../interfaces'
import { GitHandle, GoHandle } from '../handlers/Go-Handlers'

const command: GluegunCommand = {
  name: 'new-go',
  alias: ['go'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { success, spin, info },
      prompt: { ask },
    } = toolbox

    const name = parameters.first

    const goHandle = new GoHandle(toolbox)
    const gitHandle = new GitHandle(toolbox)

    goHandle.setNext(gitHandle)

    const askInitializeGitRepo = {
      type: 'confirm',
      name: 'initializeGitRepo',
      message: 'Do you want to initialize a Git repository?',
    }

    const { initializeGitRepo } = await ask([askInitializeGitRepo])
    const request: INewCommand = { name, initializeGitRepo }
    const spinner = spin('Generating files and installing dependencies')

    await goHandle.handle(request)
    spinner.stop()

    info(`
      Next:
      $ cd ${name}
      $ npm run dev
    `)
    success('Done! Generated your new project setup!!')
  },
}

module.exports = command
