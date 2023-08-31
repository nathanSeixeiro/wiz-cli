import { INewCommand } from '../index'

export interface IJsCommand extends INewCommand {
  jest?: string
  env?: string
  eslint?: string
}
