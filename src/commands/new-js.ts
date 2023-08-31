import { GluegunCommand, GluegunToolbox } from 'gluegun'
import { JavascriptHandle } from '../handlers/Js-Handlers'
import { IJsCommand } from '../interfaces'

const command: GluegunCommand = {
  name: 'new-js',
  alias: ['js'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      requiredName,
      print: { info, success },
      prompt: { ask },
    } = toolbox

    const name = parameters.first
    if (!name) {
      requiredName(name)
      return
    }

    const jsHandler = new JavascriptHandle(toolbox)

    const askInitializeGitRepo = {
      type: 'confirm',
      name: 'initializeGitRepo',
      message: 'Do you want to initialize a Git repository?',
    }

    const options = [askInitializeGitRepo]
    const { initializeGitRepo } = await ask(options)

    const request: IJsCommand = { name, initializeGitRepo }
    jsHandler.handle(request)

    info(`
    Next:
    $ cd ${name}
    $ npm run dev
    `)
    success('Done! Generated your new project setup!!')
  },
}

module.exports = command
