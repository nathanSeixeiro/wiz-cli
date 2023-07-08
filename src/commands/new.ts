import { TypescriptHandle } from '@/handlers'
import { INewCommand } from '@/interfaces'
import { GluegunToolbox } from 'gluegun'

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

    success(`Done!!`)
  },
}
