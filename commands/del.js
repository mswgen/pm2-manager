const Discord = require('discord.js');
let statuses = {
    online: 'π’ μ¨λΌμΈ',
    stopped: 'π΄ μ μ§λ¨',
    launching: 'π‘ νλ‘μΈμ€ μμ μ€',
    errored: 'π΄ μλ¬',
    stopping: 'π‘ νλ‘μΈμ€ μ μ§ μ€'
}
module.exports = {
    name: 'delete',
    aliases: ['del', 'remove', 'rm', 'tkrwp', 'wprj', 'μ­μ ', 'μ κ±°', 'γλ', 'γλγγ·', 'κ·Έ', 'γ±λγγγ·'],
    description: 'νλ‘μΈμ€λ₯Ό μ§μμ.',
    usage: 'delete <νλ‘μΈμ€ μ΄λ¦ λλ ID λλ `all`>',
    run: async (client, message, args) => {
        if (!client.ops.devs.includes(message.author.id)) return message.channel.send(`${client.user.username} κ°λ°μλ§ μ¬μ©ν  μ μμ΄μ.`);
        if (!args[1]) return message.channel.send('νλ‘μΈμ€ μ΄λ¦, ID, λλ `all`μ μλ ₯ν΄μ£ΌμΈμ.');
        try {
            require('child_process').execSync(`pm2 del ${args[1]}`);
            let lists = JSON.parse(require('child_process').execSync('pm2 jlist').toString());
            const embed = new Discord.MessageEmbed()
                .setTitle('νλ‘μΈμ€λ₯Ό μ§μ μ΄μ')
                .setColor('RANDOM')
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp();
            for (let x of lists) {
                embed.addField(x.name, `μν: ${statuses[x.pm2_env.status]}\nID: ${x.pm_id}\nμ€ν λͺ¨λ: ${x.pm2_env.exec_mode}\nνλ‘μΈμ€ ID(PID): ${x.pid}\nμνμ: ${Math.floor((new Date() - x.pm2_env.created_at) / 360000) / 10}μκ°\nμ¬μμ νμ: ${x.pm2_env.restart_time}ν\nCPU μ¬μ©λ: ${x.monit.cpu}%\nRAM μ¬μ©λ: ${x.monit.memory / 1048576|0}MB`, true);
            }
            message.channel.send(embed);
        } catch (e) {
            message.channel.send(`νλ‘μΈμ€λ₯Ό μ§μ°μ§ λͺ»νμ΄μ.`);
        }
    }
}