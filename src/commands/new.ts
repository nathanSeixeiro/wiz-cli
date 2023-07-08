import { GluegunToolbox } from 'gluegun'

import { TypescriptHandle } from '../handlers'
import { INewCommand } from '../interfaces/New/new-command'

module.exports = {
  name: 'new',
  alias: ['n'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { success, spin },
    } = toolbox

    const name = parameters.first

    const tsHandle = new TypescriptHandle(toolbox)

    const request: INewCommand = { name }
    const spinner = spin('Generating files and installing dependencies')

    tsHandle.handle(request)

    spinner.stop()

    success(`
    Done! Generated your new project setup!!

    Next:
      $ cd ${name}
      $ npm run dev
`)
  },
}
