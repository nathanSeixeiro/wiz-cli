import { GluegunCommand, GluegunToolbox } from 'gluegun'
import { ITsCommand } from '../interfaces'

import {
  GitHandle,
  TypescriptHandle,
  DotEnvHandle,
  JestHandle,
  EslintHandle,
} from '../handlers/Ts-Handlers'

const command: GluegunCommand = {
  name: 'new-ts',
  alias: ['ts'],
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

    const gitHandle = new GitHandle(toolbox)
    const jestHandle = new JestHandle(toolbox)
    const envHandle = new DotEnvHandle(toolbox)
    const tsHandle = new TypescriptHandle(toolbox)
    const eslintHandle = new EslintHandle(toolbox)

    tsHandle
      .setNext(jestHandle)
      .setNext(envHandle)
      .setNext(gitHandle)
      .setNext(eslintHandle)

    const askInitializeJestConfig = {
      type: 'confirm',
      name: 'jest',
      message: 'Do you want to add Jest?',
    }
    const askInitializeEslintConfig = {
      type: 'confirm',
      name: 'eslint',
      message: 'Do you want to add eslint?',
    }
    const askInitializeDotEnv = {
      type: 'confirm',
      name: 'env',
      message: 'Do you want to add env?',
    }
    const askInitializeGitRepo = {
      type: 'confirm',
      name: 'initializeGitRepo',
      message: 'Do you want to initialize a Git repository?',
    }

    const options = [
      askInitializeJestConfig,
      askInitializeEslintConfig,
      askInitializeDotEnv,
      askInitializeGitRepo,
    ]

    const { jest, env, eslint, initializeGitRepo } = await ask(options)

    const request: ITsCommand = { name, initializeGitRepo, jest, env, eslint }
    // const spinner = spin('Generating files and installing dependencies')

    await tsHandle.handle(request)
    // spinner.succeed()

    info(`
    Next:
    $ cd ${name}
    $ npm run dev
    `)
    success('Done! Generated your new project setup!!')
  },
}

module.exports = command
