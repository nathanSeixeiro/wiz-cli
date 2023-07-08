import { IHandle } from '../../interfaces/Abstract/abstract-handler'
import { INewCommand } from '../../interfaces/New/new-command'

export class AbstractHandle implements IHandle {
  private nextHandle: IHandle

  public setNext(handle: IHandle): IHandle {
    this.nextHandle = handle
    return handle
  }

  public handle(request: INewCommand) {
    if (this.nextHandle) {
      return this.nextHandle.handle(request)
    }

    return null
  }
}
