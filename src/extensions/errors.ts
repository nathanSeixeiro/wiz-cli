import { Toolbox } from 'gluegun/build/types/domain/toolbox'

module.exports = (toolbox: Toolbox) => {
  function requiredName(name: string, toolbox: Toolbox) {
    const {
      print: { error },
    } = toolbox
    if (!name) {
      error('Project name must be specified!')
      return
    }
  }

  toolbox.requiredName = requiredName
}
