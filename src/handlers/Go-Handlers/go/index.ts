import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../abstract'
import { INewCommand } from '../../../interfaces'

export class GoHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: INewCommand) {
    const { name } = request

    await this.toolbox.template.generate({
      template: 'Go-Templates/main.go.ejs',
      target: `${name}/main.go`,
      props: { name },
    })
    return super.handle(request)
  }
}
