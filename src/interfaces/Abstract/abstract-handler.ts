import { INewCommand } from '@/interfaces/index'

export interface IHandler {
  setNext: (handler: IHandler) => IHandler
  handler: (handler: INewCommand) => void
}
