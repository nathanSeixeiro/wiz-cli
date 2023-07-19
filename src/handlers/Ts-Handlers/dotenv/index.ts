import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../abstract'
import { INewCommand } from '../../../interfaces/New/new-command'

export class DotEnvHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: INewCommand) {
    const { name } = request

    await this.toolbox.template.generate({
      template: 'env/.env.ejs',
      target: `${name}/.env`,
    })

    await this.toolbox.template.generate({
      template: 'env/.env.example.ejs',
      target: `${name}/.env.example`,
    })

    return super.handle(request)
  }
}
