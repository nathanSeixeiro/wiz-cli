import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../abstract'
import { INewCommand } from '../../../interfaces'

export class TypescriptHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: INewCommand) {
    const { name } = request

    await this.toolbox.template.generate({
      template: 'Ts-Templates/ts/package.json.ejs',
      target: `${name}/package.json`,
      props: { name },
    })

    await this.toolbox.template.generate({
      template: 'Ts-Templates/ts/tsconfig.json.ejs',
      target: `${name}/tsconfig.json`,
    })

    await this.toolbox.template.generate({
      template: 'Ts-Templates/files/src/index.ts.ejs',
      target: `${name}/src/index.ts`,
    })

    await this.toolbox.template.generate({
      template: 'Ts-Templates/files/src/index.spec.ts.ejs',
      target: `${name}/src/index.spec.ts`,
    })

    await this.toolbox.system.run(`cd ${name} && npm install`)

    return super.handle(request)
  }
}
