const Discord = require('discord.js');
const FileSystem = require('fs');
const Status = require('../../include/status.js');
const Random = require('../../include/random.js');
const UserStats = require('../../include/userStatsLogger');

const BonkImages = FileSystem.readdirSync('./Assets/Gifs/Bonk');

module.exports = {
    name: 'bonk',
    description: 'bonk',
    execute(msg, args) {
        var idx = Random.RandInt(0, BonkImages.length);
        if (msg.mentions.users.size > 0) {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Bonk')
                .attachFiles([`./Assets/Gifs/Bonk/${BonkImages[idx]}`])
                .setThumbnail(`attachment://${BonkImages[idx]}`)
                .addField('Bonked', msg.mentions.users.array().join('\n'))
                .setFooter(`Bonked by ${msg.author.tag}`));
            msg.mentions.users.forEach(user => {
                UserStats.LogUserStat(msg.author, 'BonksGiven', user);
                UserStats.LogUserStat(user, 'BonksReceived', msg.author);
            });
        } else {
            args.shift();
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Bonk')
                .attachFiles([`./Assets/Gifs/Bonk/${BonkImages[idx]}`])
                .setThumbnail(`attachment://${BonkImages[idx]}`)
                .addField('Bonked', args.join(' '))
                .setFooter(`Bonked by ${msg.author.tag}`));
        }

        return true;
    }
}