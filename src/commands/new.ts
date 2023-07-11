import { GluegunToolbox } from 'gluegun'

import { TypescriptHandle } from '../handlers'
import { INewCommand } from '../interfaces/New/new-command'
import { DotEnvHandle } from '../handlers/dotenv'

module.exports = {
  name: 'new',
  alias: ['n'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { success, spin, info },
    } = toolbox

    const name = parameters.first

    const tsHandle = new TypescriptHandle(toolbox)
    const envHandle = new DotEnvHandle(toolbox)

    tsHandle.setNext(envHandle)

    const request: INewCommand = { name }
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
