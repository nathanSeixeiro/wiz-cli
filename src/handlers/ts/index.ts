import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../abstract'
import { INewCommand } from '../../interfaces/New/new-command'

export class TypescriptHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(req: INewCommand) {
    const name = req.name

    await this.toolbox.template.generate({
      template: 'ts/package.json.ejs',
      target: `${name}/package.json`,
    })

    await this.toolbox.template.generate({
      template: 'ts/tsconfig.json.ejs',
      target: `${name}/tsconfig.json`,
    })

    await this.toolbox.system.run(`cd ${name} && npm install`)

    return super.handle(req)
  }
}
