import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../common/abstract'
import { INewCommand } from '../../../interfaces'

export class GoHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: INewCommand) {
    const { name } = request

    await this.toolbox.template.generate({
      template: 'Go-Templates/main.go.ejs',
      target: `${name}/cmd/main.go`,
      props: { name },
    })

    await this.toolbox.system.run(
      `cd ${name} && go mod init github.com/nathanSeixeiro/${name}`
    )
    return super.handle(request)
  }
}
