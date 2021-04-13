const Discord = require('discord.js');
const Random = require('../../include/random.js');
const FileSystem = require('fs');

const Traps = FileSystem.readdirSync('./Assets/Images/Traps');

module.exports = {
    name: 'trap',
    description: 'So you\'re into traps?',
    execute(msg, args) {
        idx = Random.RandInt(0, Traps.length);

        msg.channel.send(new Discord.MessageEmbed()
            .setTitle('Heard you like traps')
            .setDescription(`${Traps[idx].replace('.png')} says Hi!`)
            .setColor('#FFFFFF')
            .attachFiles([`./Assets/Images/Traps/${Traps[idx]}`])
            .setImage(`attachment://${Traps[idx]}`)
            .setFooter(`${msg.author.username} summoned a trap. PauseChamp`)
        );

        return true;
    }
}