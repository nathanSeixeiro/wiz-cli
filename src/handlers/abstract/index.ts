import { IHandle, INewCommand } from '@/interfaces'

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
