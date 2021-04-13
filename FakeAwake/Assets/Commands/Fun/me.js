const Discord = require('discord.js');
const Vibrant = require('node-vibrant');
const Website = require('../../include/webclient');
const Sharp = require('sharp');
const Status = require('../../include/status.js');
const Utils = require('../../include/utils.js');

async function getProfileColor(msg) {
    await Website.DownloadFile(msg.author.avatarURL(), './Assets/temp/meProfileImage.webp');
    await Sharp('./Assets/temp/meProfileImage.webp').toFile('./Assets/temp/meProfileImage.png');
    return new Vibrant.from('./Assets/temp/meProfileImage.png')
}

module.exports = {
    name: 'me',
    description: 'Returns info on the mentioned user',
    execute(msg, args) {
        if (!msg.mentions.members.size) {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle(`${msg.author.username}'s Infos`)
                .setColor('#ffffff')
                .setThumbnail(msg.author.avatarURL())
                .addFields(
                    { name: 'User Tag', value: msg.author.tag },
                    { name: 'Cake Day', value: msg.author.createdAt },
                    { name: 'Is Bot', value: msg.author.bot },
                    { name: 'Presence', value: Utils.CapitilizeFirstLetter(msg.member.presence.status) },
                    { name: 'Nickname on this Server', value: msg.member },
                    { name: 'Is owner of this Server', value: msg.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR, { checkAdmin: true }) },
                    { name: 'Has admin on this Server', value: msg.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR, { checkOwner: true }) },
                    { name: 'Roles on this Server', value: msg.member.roles.cache.array().toString() }
                )
                .setFooter('Look at this hottie')
            );
        } else if (msg.mentions.members.size) {
            msg.mentions.members.forEach(user => {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle(`${user.user.username}'s Infos`)
                    .setColor('#ffffff')
                    .setThumbnail(user.user.avatarURL())
                    .addFields(
                        { name: 'User Tag', value: user.user.tag },
                        { name: 'Cake Day', value: user.user.createdAt },
                        { name: 'Is Bot', value: user.user.bot },
                        { name: 'Presence', value: Utils.CapitilizeFirstLetter(user.presence.status) },
                        { name: 'Nickname on this Server', value: user.user },
                        { name: 'Is owner of this Server', value: user.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR, { checkAdmin: true }) },
                        { name: 'Has admin on this Server', value: user.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR, { checkOwner: true }) },
                        { name: 'Roles on this Server', value: user.roles.cache.array().toString() }
                    )
                    .setFooter('Look at this hottie')
                );
            });
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'me {@username} [@username2] [@username3]...', value: 'Returns how gay the mentioned user is.' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}