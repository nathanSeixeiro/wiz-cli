import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../abstract'
import { ITsCommand } from '../../../interfaces'

export class TypescriptHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: ITsCommand) {
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

    await this.installDependencies(request)
    await this.toolbox.system.run(`cd ${name} && npm install`)
    return super.handle(request)
  }

  private async installDotenv(path: string) {
    await this.toolbox.system.run(`cd ${path} && npm install dotenv`)
  }

  private async installJest(path: string) {
    await this.toolbox.system.run(
      `cd ${path} && npm install jest ts-jest @types/jest -D`
    )
  }

  private async installEslint(path: string) {
    await this.toolbox.system.run(
      `cd ${path} && npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript`
    )
  }

  private async installDependencies({ ...params }: ITsCommand) {
    const { name, env, jest, eslint } = params
    if (env) {
      await this.installDotenv(name)
    }

    if (jest) {
      await this.installJest(name)
    }

    if (eslint) {
      await this.installEslint(name)
    }
  }
}
