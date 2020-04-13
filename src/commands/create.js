import Discord from 'discord.js'
import split from 'split-string'

const splitOptions = {
    separator: ' ',
    quotes: ['"'],
    keep (value) {
        return value !== '"'
    },
}

const isEmoji = text => {
    const regex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g
    return regex.test(text)
}

const getDiscordID = emoji => {
    return emoji.match(/([0-9]*)/g).find(i => i)
}

export default function (client) {
    return {
        command: 'create',
        async handler (sender, args) {
            try {
                const [ channel, message, ...options] = split(args.join(' '), splitOptions)

                const embededMessage = new Discord.MessageEmbed()
                    .setColor('#d74242')
                    .setTitle('Encuesta')
                    // .setAuthor(
                    //     `${sender.author.username}#${sender.author.discriminator}`,
                    //     `https://cdn.discordapp.com/avatars/${sender.author.id}/${sender.author.avatar}.png`,
                    //     `https://discordapp.com/channels/@me/${sender.author.id}`
                    // )
                    .setDescription(message)
                    .setFooter('Reacciona a este mensaje para emitir tu voto')

                const destinationChannel = channel !== 'here'
                    ? client.channels.cache.get(getDiscordID(channel))
                    : sender.channel

                const poll = await destinationChannel.send(embededMessage)

                options.forEach(option => {
                    const reaction = option.trim()

                    if (reaction.includes('<:')) {
                        poll.react(getDiscordID(reaction))
                    }

                    if (isEmoji(reaction)) {
                        poll.react(reaction)
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
}