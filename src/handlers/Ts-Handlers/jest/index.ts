import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../abstract'
import { INewCommand } from '../../../interfaces'

export class JestHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: INewCommand) {
    const { name } = request

    await this.toolbox.template.generate({
      template: 'Ts-Templates/jest/jest.config.js.ejs',
      target: `${name}/jest.config.js`,
    })

    return super.handle(request)
  }
}
