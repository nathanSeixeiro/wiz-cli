import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../abstract'
import { ITsCommand } from '../../../interfaces'

export class GitHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: ITsCommand) {
    const { name, initializeGitRepo } = request

    if (initializeGitRepo) {
      await this.toolbox.template.generate({
        template: 'Ts-Templates/git/.gitignore.ejs',
        target: `${name}/.gitignore`,
      })

      await this.toolbox.system.run(
        `cd ${name} && git init && git add . && git commit -m "initial commit"`
      )

      return super.handle(request)
    }
  }
}
