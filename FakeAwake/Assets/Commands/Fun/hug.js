const Discord = require('discord.js');
const Status = require('../../include/status.js');

module.exports = {
    name: 'hug',
    description: 'hug someone',
    execute(msg, args) {
        if (msg.mentions.users.size === 1) {
            if (msg.author.id === '713807072105332817') {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Hugs')
                    .setColor('#f582ff')
                    .attachFiles(['./Assets/Images/SerenityHug.png'])
                    .setThumbnail('attachment://SerenityHug.png')
                    .setDescription(`${msg.author} hugs ${msg.mentions.users.first()}`)
                    .setFooter(`Hugged by ${msg.author.tag}`));
            } else {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Hugs')
                    .setColor('#f582ff')
                    .attachFiles(['./Assets/Gifs/AnimeHug.gif'])
                    .setThumbnail('attachment://AnimeHug.gif')
                    .setDescription(`${msg.author} hugs ${msg.mentions.users.first()}`)
                    .setFooter(`Hugged by ${msg.author.tag}`));
            }
        } else if (msg.mentions.users.size > 1) {
            if (msg.author.id === '713807072105332817') {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Hugs')
                    .setColor('#f582ff')
                    .attachFiles(['./Assets/Images/SerenityHug.png'])
                    .setThumbnail('attachment://SerenityHug.png')
                    .addField('Hugs to', msg.mentions.users.array().join('\n'))
                    .setFooter(`Hugged by ${msg.author.tag}`));
            } else {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Hugs')
                    .setColor('#f582ff')
                    .attachFiles(['./Assets/Gifs/AnimeHug.gif'])
                    .setThumbnail('attachment://AnimeHug.gif')
                    .addField('Hugs to', msg.mentions.users.array().join('\n'))
                    .setFooter(`Hugged by ${msg.author.tag}`));
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'hug  {@username} [@username2] [@username3]...', value: 'Hug the entered users.' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}