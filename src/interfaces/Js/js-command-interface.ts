import { INewCommand } from '../New/new-command'

export interface IJsCommand extends INewCommand {
  jest?: string
  env?: string
  eslint?: string
}
