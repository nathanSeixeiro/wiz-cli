import { GluegunToolbox } from 'gluegun'

import { TypescriptHandle } from '../handlers'
import { INewCommand } from '../interfaces/New/new-command'

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

    const request: INewCommand = { name }

    tsHandle.handle(request)

    const spinner = spin('Generating files and installing dependencies')
    spinner.stop()

    success('Done! Generated your new project setup!!')
    info(`
    Next:
      $ cd ${name}
      $ npm run dev
`)
  },
}
