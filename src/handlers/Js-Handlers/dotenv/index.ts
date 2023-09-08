import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../common'
import { IJsCommand } from '../../../interfaces'

export class DotEnvHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }
  public async handle(request: IJsCommand) {
    const { name, env } = request

    if (env) {
      await this.toolbox.template.generate({
        template: 'Js-Templates/env/.env.ejs',
        target: `${name}/.env`,
      })

      await this.toolbox.template.generate({
        template: 'Js-Templates/env/.env.example.ejs',
        target: `${name}/.env.example`,
      })

      return super.handle(request)
    }
    return super.handle(request)
  }
}
