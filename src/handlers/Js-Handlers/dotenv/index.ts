import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../common/abstract'
import { ITsCommand } from '../../../interfaces'

export class DotEnvHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: ITsCommand) {
    const { name, env } = request

    if (env) {
      await this.toolbox.template.generate({
        template: 'Ts-Templates/env/.env.ejs',
        target: `${name}/.env`,
      })

      await this.toolbox.template.generate({
        template: 'Ts-Templates/env/.env.example.ejs',
        target: `${name}/.env.example`,
      })

      return super.handle(request)
    }
    return super.handle(request)
  }
}
