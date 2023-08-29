import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../abstract'
import { ITsCommand } from '../../../interfaces'

export class TypescriptHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: ITsCommand) {
    const { name, env, jest, eslint } = request

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
      await this.installDotenv(name, env)
    }

    if (jest) {
      await this.installJest(name, jest)
    }

    await this.installDependencies(request, eslint)

    await this.toolbox.system.run(`cd ${name} && npm install`)
    return super.handle(request)
  }

  private async installDependencies(req: ITsCommand, dependency: string): Promise<void> {
    const { jest, env, eslint, name } = req

    
    if (dependency === jest) {
      await this.toolbox.system.run(
        `cd ${name} && npm install jest ts-jest @types/jest -D`
      )
    }

    if (dependency === env) {
      await this.toolbox.system.run(`cd ${name} && npm install dotenv`)
    }

    if (dependency === eslint) {
      await this.toolbox.system.run(
        `cd ${name} && npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript`
        )
    } 
  }

  async installDotenv(name: string, env: string) {
    if (env) {
      await this.toolbox.system.run(`cd ${name} && npm install dotenv`)
    }
  }

  async installJest(name: string, jest: string) {
    if (jest) {
      await this.toolbox.system.run(
        `cd ${name} && npm install jest ts-jest @types/jest -D`
      )
    }
  }
}
