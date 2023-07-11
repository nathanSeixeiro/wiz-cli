import { GluegunToolbox } from 'gluegun'

import { INewCommand } from '../interfaces/New/new-command'

import { GitHandle, TypescriptHandle, DotEnvHandle } from '../handlers'

module.exports = {
  name: 'new',
  alias: ['n'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { success, spin, info },
      prompt: { ask },
    } = toolbox

    const name = parameters.first

    const tsHandle = new TypescriptHandle(toolbox)
    const envHandle = new DotEnvHandle(toolbox)
    const gitHandle = new GitHandle(toolbox)

    tsHandle.setNext(envHandle).setNext(gitHandle)

    const askInitializeGitRepo = {
      type: 'confirm',
      name: 'initializeGitRepo',
      message: 'Do you want to initialize a Git repository?',
    }

    const { initializeGitRepo } = await ask([askInitializeGitRepo])

    const request: INewCommand = { name, initializeGitRepo }
    const spinner = spin('Generating files and installing dependencies')

    await tsHandle.handle(request)

    spinner.stop()

    success('Done! Generated your new project setup!!')
    info(`
    Next:
      $ cd ${name}
      $ npm run dev
`)
  },
}
