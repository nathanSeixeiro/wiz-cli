import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'wiz',
  run: async (toolbox) => {
    const { print } = toolbox

    print.success('Welcome to Wiz cli, your setup generator!!')
    print.info('type "wiz h" for help.')
  },
}

module.exports = command
