import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../common/abstract'
import { IJsCommand } from '../../../interfaces'

export class JavascriptHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: IJsCommand) {
    const { name } = request

    //package index

    await this.installDependencies(request)
    await this.toolbox.system.run(`cd ${name} && npm install`)
    return super.handle(request)
  }

  private async installDotenv(path: string) {
    await this.toolbox.system.run(`cd ${path} && npm install dotenv`)
  }

  private async installJest(path: string) {
    await this.toolbox.system.run(`cd ${path} && npm install jest -D`)
  }

  private async installEslint(path: string) {
    await this.toolbox.system.run(`cd ${path} && npm install --save-dev eslint`)
  }

  private async installDependencies({ ...params }: IJsCommand) {
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
