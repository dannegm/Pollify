import { MessageEmbed } from 'discord.js'
import { getDiscordID, isEmoji } from '@/utils/helpers'

export default function (client) {
    return {
        command: 'create',
        async handler (sender, args) {
            try {
                const [channel, message, ...options] = args

                const embededMessage = new MessageEmbed()
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
                console.error(err)
            }
        }
    }
}