export default function () {
    return {
        command: 'describe',
        handler (sender, args) {
            const [ name, age, color ] = args
            sender.channel.send(`Soy ${name} y tengo ${age} años, me gusta el color ${color}`)
        }
    }
}