import { GluegunToolbox } from 'gluegun'
import { AbstractHandle } from '../../abstract'
import { INewCommand } from '../../../interfaces'

export class GoHandle extends AbstractHandle {
  constructor(private toolbox: GluegunToolbox) {
    super()
  }

  public handle(request: INewCommand): void {
    // const { name } = request.name

    // await this.toolbox.template.generate({
    //     template: ''
    // })
    return super.handle(request)
  }
}
