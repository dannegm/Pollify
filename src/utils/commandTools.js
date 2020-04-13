import split from 'split-string'

const splitOptions = {
    separator: ' ',
    quotes: ['"'],
    keep (value) {
        return value !== '"'
    },
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

    const [ promp, command, ...remaining ] = message.content.split(' ')

    if (promp !== '$poll') {
        return false
    }

    if (!command || !commands[command]) {
        message.channel.send('Invalid command')
        return false
    }

    const args = split(remaining.join(' '), splitOptions)
    commands[command].handler(message, args)
    return true
}

export {
    registerCommands,
    handleCommands,
}
