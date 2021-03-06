const Discord = require('discord.js');
let statuses = {
    online: 'π’ μ¨λΌμΈ',
    stopped: 'π΄ μ μ§λ¨',
    launching: 'π‘ νλ‘μΈμ€ μμ μ€',
    errored: 'π΄ μλ¬',
    stopping: 'π‘ νλ‘μΈμ€ μ μ§ μ€'
}
module.exports = {
    name: 'list',
    aliases: ['λ¦¬μ€νΈ', 'γ£γγ΄γ', 'fltmxm', 'λͺ©λ‘', 'ahrfhr', 'ls', 'γ£γ΄'],
    description: 'μ€νμ€μΈ νλ‘μΈμ€ λͺ©λ‘μ λ³΄μ¬μ€μ.',
    usage: 'list',
    run: async (client, message, args) => {
        let lists = JSON.parse(require('child_process').execSync('pm2 jlist').toString());
        const embed = new Discord.MessageEmbed()
        .setTitle('νλ‘μΈμ€ λ¦¬μ€νΈ')
        .setColor('RANDOM')
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp();
        for (let x of lists) {
            embed.addField(x.name, `μν: ${statuses[x.pm2_env.status]}\nID: ${x.pm_id}\nμ€ν λͺ¨λ: ${x.pm2_env.exec_mode}\nνλ‘μΈμ€ ID(PID): ${x.pid}\nμνμ: ${Math.floor((new Date() - x.pm2_env.created_at) / 360000) / 10}μκ°\nμ¬μμ νμ: ${x.pm2_env.restart_time}ν\nCPU μ¬μ©λ: ${x.monit.cpu}%\nRAM μ¬μ©λ: ${x.monit.memory / 1048576|0}MB`, true);
        }
        message.channel.send(embed);
    }
}