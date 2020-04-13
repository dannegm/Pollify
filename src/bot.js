import Discord from 'discord.js'

import sampleCommand from '@/commands/sample'
import createCommand from '@/commands/create'

const client = new Discord.Client()

const awakeBot = config => {
    client.login(config.credentials.token)

    client.on('ready', () => onReady())
    client.on('message', m => onMessage(m))
}

const onReady = () => {
    console.log('Hello World! :D')
}

const onMessage = message => {
    handleCommands(message, [
        sampleCommand(client),
        createCommand(client),
    ])
}

const registerCommands = commands => {
    const register = {}
    commands.forEach(cmd => {
        register[cmd.command] = cmd
    })

    return register
}

const handleCommands = (message, registeredCommands) => {
    const commands = registerCommands(registeredCommands)

    const [ promp, command, ...args ] = message.content.split(' ')

    if (promp !== '$poll') {
        return false
    }

    if (!command || !commands[command]) {
        message.channel.send('Invalid command')
        return false
    }

    commands[command].handler(message, args)
    return true
}

export {
    awakeBot,
    onMessage,
}
