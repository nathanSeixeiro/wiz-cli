import { AbstractHandle } from '@/handlers'
import { INewCommand } from '@/interfaces'
import { GluegunToolbox } from 'gluegun'

export class TypescriptHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(req: INewCommand) {
    const name = req.name
    await this.toolbox.template.generate({
      template: 'tsconfig.json.ejs',
      target: `${name}/tsconfig.json`,
    })

    return super.handle(req)
  }
}
