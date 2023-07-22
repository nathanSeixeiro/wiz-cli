import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../abstract'
import { ITsCommand } from '../../../interfaces'

export class JestHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: ITsCommand) {
    const { name, jest } = request
    if (jest) {
      await this.toolbox.template.generate({
        template: 'Ts-Templates/jest/jest.config.js.ejs',
        target: `${name}/jest.config.js`,
      })

      await this.toolbox.template.generate({
        template: 'Ts-Templates/files/src/index.spec.ts.ejs',
        target: `${name}/src/index.spec.ts`,
      })

      return super.handle(request)
    }
    return super.handle(request)
  }
}
