import { Client } from 'discord.js'

import { handleCommands } from '@/utils/commandTools'

import sampleCommand from '@/commands/sample'
import createCommand from '@/commands/create'

const client = new Client()

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

export {
    awakeBot,
    onMessage,
}
