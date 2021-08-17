const Discord = require('discord.js');
const Status = require('../../include/status.js');
const UserStats = require('../../include/userStatsLogger');

module.exports = {
    name: 'hug',
    description: 'hug someone',
    execute(msg, args) {
        if (msg.mentions.users.size === 1) {
            let Thumbnail = './Assets/Gifs/AnimeHug.gif';
            if (msg.author.id === '713807072105332817') {
                Thumbnail = './Assets/Images/SerenityHug.png';
            }
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Hugs')
                .setColor('#f582ff')
                .attachFiles([Thumbnail])
                .setThumbnail(`attachment://${Thumbnail.split('/')[Thumbnail.split('/').length - 1]}`)
                .setDescription(`${msg.author} hugs ${msg.mentions.users.first()}`)
                .setFooter(`Hugged by ${msg.author.tag}`));
            msg.mentions.users.forEach(user => {
                UserStats.LogUserStat(msg.author, 'HugsGiven', user);
                UserStats.LogUserStat(user, 'HugsReceived', msg.author);
            });
        } else if (msg.mentions.users.size > 1) {
            let Thumbnail = './Assets/Gifs/AnimeHug.gif';
            if (msg.author.id === '713807072105332817') {
                Thumbnail = './Assets/Images/SerenityHug.png';
            }
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Hugs')
                .setColor('#f582ff')
                .attachFiles([Thumbnail])
                .setThumbnail(`attachment://${Thumbnail.split('/')[Thumbnail.split('/').length - 1]}`)
                .addField('Hugs to', msg.mentions.users.array().join('\n'))
                .setFooter(`Hugged by ${msg.author.tag}`));
            msg.mentions.users.forEach(user => {
                UserStats.LogUserStat(msg.author, 'HugsGiven', user);
                UserStats.LogUserStat(user, 'HugsReceived', msg.author);
            });
        } else {
            let Thumbnail = './Assets/Gifs/AnimeHug.gif';
            if (msg.author.id === '713807072105332817') {
                Thumbnail = './Assets/Images/SerenityHug.png';
            }
            args.shift();
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Hugs')
                .setColor('#f582ff')
                .attachFiles([Thumbnail])
                .setThumbnail(`attachment://${Thumbnail.split('/')[Thumbnail.split('/').length - 1]}`)
                .setDescription(`${msg.author} hugs ${args.join(' ')}`)
                .setFooter(`Hugged by ${msg.author.tag}`));
        }

        return true;
    }
}