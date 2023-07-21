import { Toolbox } from 'gluegun/build/types/domain/toolbox'

export class Errors {
  constructor(private toolbox: Toolbox) {}
  requiredName = (name: string) => {
    if (!name) {
      this.toolbox.print.error('Project name must be specified!')
      return
    }
  }
}
