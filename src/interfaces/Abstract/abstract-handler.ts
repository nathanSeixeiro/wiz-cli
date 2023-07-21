import { INewCommand } from '../index'

export interface IHandle {
  setNext(handle: IHandle): IHandle
  handle(handle: INewCommand): void
}
