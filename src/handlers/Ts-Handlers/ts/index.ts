import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../abstract'
import { ITsCommand } from '../../../interfaces'

export class TypescriptHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: ITsCommand) {
    const { name, env } = request

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

    if (env) {
      await this.toolbox.system.run(`cd ${name} && npm install dotenv`)
    }
    await this.toolbox.system.run(`cd ${name} && npm install`)

    return super.handle(request)
  }
}
