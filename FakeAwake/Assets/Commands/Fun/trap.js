const Discord = require('discord.js');
const Random = require('../../include/random.js');



module.exports = {
    name: 'trap',
    description: 'So you\'re into traps?',
    execute(msg, args) {
        const trap = Random.RandInt(0, 101);
        if (trap > 50 && trap <= 100) {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Heard you like traps')
                .setDescription('Felix says Hi!')
                .setColor('#0fefff')
                .setImage('https://cdn.discordapp.com/attachments/706098244081680385/814173774114324500/Felix.png')
                .setFooter(`${msg.author.username} summoned a trap. PauseChamp`)
            );
        }

        if (trap > 0 && trap <= 49) {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Heard you like traps')
                .setDescription('Astolfo says Hi!')
                .setColor('#fcc2e0')
                .setImage('https://static.wikia.nocookie.net/versus-compendium/images/1/1e/Astolfo.png')
                .setFooter(`${msg.author.username} summoned a trap. PauseChamp`)
            );
        }

        return true;
    }
}