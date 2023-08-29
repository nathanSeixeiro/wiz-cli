import { INewCommand } from '../index'

export interface ITsCommand extends INewCommand {
  jest: string
  env: string
  eslint: string
}
