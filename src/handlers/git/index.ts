import { INewCommand } from '../../interfaces/New/new-command'
import { AbstractHandle } from '../abstract'
import { GluegunToolbox } from 'gluegun'

export class GitHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public async handle(request: INewCommand) {
    const { name, initializeGitRepo } = request

    if (initializeGitRepo) {
      await this.toolbox.template.generate({
        template: 'git/.gitignore.ejs',
        target: `${name}/.gitignore`,
      })

      await this.toolbox.system.run(
        `cd ${name} && git init && git add . && git commit -m "initial commit"`
      )

      return super.handle(request)
    }
  }
}
