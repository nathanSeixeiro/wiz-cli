import { INewCommand } from '../New/new-command'

export interface IHandle {
  setNext(handle: IHandle): IHandle
  handle(handle: INewCommand): void
}
