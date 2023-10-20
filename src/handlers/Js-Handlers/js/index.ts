import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../abstract'
import { IJsCommand } from '../../../interfaces'

export class JavascriptHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }
  public async handle(request: IJsCommand) {
    const { name } = request
    await this.toolbox.template.generate({
      template: 'Js-Templates/js/package.json.ejs',
      target: `${name}/package.json`,
      props: { name },
    })

    await this.toolbox.template.generate({
      template: 'Js-Templates/files/src/index.js.ejs',
      target: `${name}/src/index.js`,
    })
  }
}
