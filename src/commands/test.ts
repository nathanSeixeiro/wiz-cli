import { GluegunCommand, GluegunToolbox } from 'gluegun'
import { ITsCommand } from '../interfaces'

import { DotEnvHandle, GitHandle, JestHandle } from '../handlers/Ts-Handlers'
import { AbstractHandle } from '../handlers'

const command: GluegunCommand = {
  name: 'test',
  alias: ['tt'],
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
    const tsHandle = new TypescriptHandleSpy(toolbox)

    tsHandle.setNext(jestHandle).setNext(envHandle).setNext(gitHandle)

    const askInitializeJestConfig = {
      type: 'confirm',
      name: 'jest',
      message: 'Do you want to add Jest?',
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
      askInitializeDotEnv,
      askInitializeGitRepo,
    ]

    const { jest, env, initializeGitRepo } = await ask(options)

    const request: ITsCommand = { name, initializeGitRepo, jest, env }
    // const spinner = spin('Generating files and installing dependencies')

    await tsHandle.handle(request)
    // spinner.stop()

    info(`
      Next:
      $ cd ${name}
      $ npm run dev
    `)
    success('Done! Generated your new project setup!!')
  },
}
module.exports = command

export class TypescriptHandleSpy extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: ITsCommand) {
    const { name, env } = request

    await this.toolbox.template.generate({
      template: 'Ts-Templates/ts/package.json.ejs',
      target: `${name}/package.json`,
      props: { name },
    })

    await this.toolbox.template.generate({
      template: 'Ts-Templates/ts/tsconfig.json.ejs',
      target: `${name}/tsconfig.json`,
    })

    await this.toolbox.template.generate({
      template: 'Ts-Templates/files/src/index.ts.ejs',
      target: `${name}/src/index.ts`,
    })
    if (env) {
      await this.toolbox.system.run(`cd ${name} && npm install dotenv`)
    }
    await this.toolbox.system.run(`cd ${name} && npm install`)

    return super.handle(request)
  }
}
