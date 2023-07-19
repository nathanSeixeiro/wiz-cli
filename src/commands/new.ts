import { GluegunCommand, GluegunToolbox } from 'gluegun'

import { INewCommand } from '../interfaces/New/new-command'

import {
  GitHandle,
  TypescriptHandle,
  DotEnvHandle,
  JestHandle,
} from '../handlers/TsHandlers'

const command: GluegunCommand = {
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
    const jestHandle = new JestHandle(toolbox)

    tsHandle.setNext(envHandle).setNext(gitHandle).setNext(jestHandle)

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

    info(`
      Next:
      $ cd ${name}
      $ npm run dev
    `)
    success('Done! Generated your new project setup!!')
  },
}

module.exports = command
