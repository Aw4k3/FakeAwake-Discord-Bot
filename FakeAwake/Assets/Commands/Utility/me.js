const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Utils = require('../../include/utils.js');
const FileSystem = require('fs');
const Chroma = require('chroma-js');

const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

function buildFieldData(args, idx, spoiler = true) {
    var FieldData = '';
    for (var i = idx + 1; i < args.length; i++) {
        if (!args[i].includes('--')) {
            FieldData += args[i] + ' ';
        } else {
            break;
        }
    }

    if (spoiler) {
        return `||${FieldData.trim()}||`;
    } else {
        return FieldData.trim();
    }
}

module.exports = {
    name: 'me',
    description: 'Returns info on the mentioned user',
    execute(msg, args, argsWithCase) {
        if (args.includes('-add')) {
            var JObject = JSON.parse(FileSystem.readFileSync('./Assets/Data/me.json'));
            if (!JObject.hasOwnProperty(msg.author.id)) { JObject[msg.author.id] = JSON.parse(`{}`); }
            var updatedFields = [];
            for (var i = 0; i < args.length; i++) {
                switch (args[i]) {
                    case '--help':
                        msg.channel.send(new Discord.MessageEmbed()
                            .setTitle('Help > Me > Add')
                            .addFields(
                                { name: 'Birthday', value: '.me -add --birthday {your birthday}\nDate will be auto parsed, if it parses incorrectly, try a different format.' },
                                { name: 'Twitch', value: '.me -add --twitch {link/name}' },
                                { name: 'Youtube', value: '.me -add --youtube {link/name}' },
                                { name: 'Scoresaber', value: '.me -add --scoresaber {link}' },
                                { name: 'Pronouns', value: '.me -add --prounouns {pronouns}' },
                                { name: 'Country', value: '.me -add --country {country}' },
                                { name: 'Timezone', value: '.me -add --timezone {timezone}' },
                                { name: 'Bio', value: '.me -add --bio {literally what ever you want}' },
                                { name: 'Embed Color', value: '.me -add --colo(u)r {Specify Format: RGB, HSV or HEX} {Color Data}' }
                            )
                            .setFooter('To remove a field, leave the data blank.')
                        );
                        break;

                    case '--birthday': {
                        const birthdayJSON = new Date(buildFieldData(msg, i));
                        JObject[msg.author.id]["Birthday"] = `${Months[birthdayJSON.getMonth()]} ${birthdayJSON.getDate()}, ${birthdayJSON.getFullYear()}`;
                        updatedFields.push('Birthday');
                        break;
                    }
                    case '--twitch':
                        JObject[msg.author.id]["Twitch"] = buildFieldData(argsWithCase.split(' '), i, false);
                        updatedFields.push('Twitch');
                        break;

                    case '--youtube':
                        JObject[msg.author.id]["Youtube"] = buildFieldData(argsWithCase, i, false);
                        updatedFields.push('Youtube');
                        break;

                    case '--scoresaber':
                    case '--sb':
                        JObject[msg.author.id]["Scoresaber"] = buildFieldData(argsWithCase, i, false).split('&')[0];
                        updatedFields.push('Scoresaber');
                        break;

                    case '--pronouns':
                        JObject[msg.author.id]["Pronouns"] = buildFieldData(argsWithCase, i);
                        updatedFields.push('Prounouns');
                        break;

                    case '--country':
                        JObject[msg.author.id]["Country"] = buildFieldData(argsWithCase, i);
                        updatedFields.push('Country');
                        break;

                    case '--timezone':
                        JObject[msg.author.id]["Timezone"] = buildFieldData(argsWithCase, i);
                        updatedFields.push('Timezone');
                        break;

                    case '--bio':
                        JObject[msg.author.id]["Bio"] = buildFieldData(argsWithCase, i, false);
                        updatedFields.push('Bio');
                        break;

                    case '--color':
                    case '--colour':
                        {
                            const ColorInfo = buildFieldData(args, i, false).split(' ');
                            var ResovledColor;
                            switch (ColorInfo[0]) {
                                case 'rgb':
                                    if (ColorInfo.length >= 4) { ResovledColor = Chroma.rgb(parseInt(ColorInfo[1]) || 0, parseInt(ColorInfo[2]) || 0, parseInt(ColorInfo[3]) || 0); }
                                    break;


                                case 'hsv':
                                    if (ColorInfo.length >= 4) { ResovledColor = Chroma.hsv(parseInt(ColorInfo[1]) || 0, parseInt(ColorInfo[2]) || 0, parseInt(ColorInfo[3]) || 0); }
                                    break;


                                case 'hex':
                                    if (ColorInfo.length >= 2) { ResovledColor = Chroma.hex(ColorInfo[1])}
                                    break;
                            }
                            JObject[msg.author.id]["EmbedStripColor"] = ResovledColor.hex();
                            updatedFields.push('EmbedStripColor');
                        }
                        break;
                }
            }

            FileSystem.writeFileSync('./Assets/Data/me.json', JSON.stringify(JObject, null, 2));
            if (updatedFields.length > 0) {
                msg.reply(`Updated fields ${updatedFields}.`);
            }
        } else {
            let JObject = JSON.parse(FileSystem.readFileSync('./Assets/Data/me.json'));
            if (!msg.mentions.members.size) { // Get self infos
                var embed = new Discord.MessageEmbed()
                    .setTitle(`${msg.author.username}'s Infos`)
                    .setColor('#ffffff')
                    .setThumbnail(msg.author.avatarURL())
                    .addFields(
                        { name: 'User Tag', value: `||${msg.author.tag}||` },
                        { name: 'Cake Day', value: msg.author.createdAt },
                        { name: 'Is Bot', value: msg.author.bot },
                        { name: 'Presence', value: Utils.CapitilizeFirstLetter(msg.member.presence.status) },
                        { name: 'Nickname on this Server', value: msg.member },
                        { name: 'Is owner of this Server', value: msg.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR, { checkAdmin: true }) },
                        { name: 'Has admin on this Server', value: msg.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR, { checkOwner: true }) },
                        { name: 'Roles on this Server', value: msg.member.roles.cache.array().toString() }
                    )
                    .setFooter('Look at this hottie! Type ".me -add --help" to see available custom fields you can add');

                if (JObject.hasOwnProperty(msg.author.id)) {
                    for (let i = 0; i < Object.keys(JObject[msg.author.id]).length; i++) {
                        if (JObject[msg.author.id][Object.keys(JObject[msg.author.id])[i]] === '') {
                            delete JObject[msg.author.id][Object.keys(JObject[msg.author.id])[i]];
                            FileSystem.writeFileSync('./Assets/Data/me.json', JSON.stringify(JObject, null, 2));
                        } else {
                            embed.addField(Object.keys(JObject[msg.author.id])[i], JObject[msg.author.id][Object.keys(JObject[msg.author.id])[i]]);
                        }
                        
                    }
                }

                if (JObject.hasOwnProperty(msg.author.id)) {
                    if (JObject[msg.author.id].hasOwnProperty("EmbedStripColor")) {
                        embed.setColor(JObject[msg.author.id]["EmbedStripColor"]);
                    }
                } else {
                    embed.setColor('#ffffff');
                }

                msg.channel.send(embed);
            } else if (msg.mentions.members.size) { // Get mentions infos
                msg.mentions.members.forEach(user => {
                    var embed = new Discord.MessageEmbed()
                        .setTitle(`${user.user.username}'s Infos`)
                        .setColor('#ffffff')
                        .setThumbnail(user.user.avatarURL())
                        .addFields(
                            { name: 'User Tag', value: `||${user.user.tag}||` },
                            { name: 'Cake Day', value: user.user.createdAt },
                            { name: 'Is Bot', value: user.user.bot },
                            { name: 'Presence', value: Utils.CapitilizeFirstLetter(user.presence.status) },
                            { name: 'Nickname on this Server', value: user.user },
                            { name: 'Is owner of this Server', value: user.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR, { checkAdmin: true }) },
                            { name: 'Has admin on this Server', value: user.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR, { checkOwner: true }) },
                            { name: 'Roles on this Server', value: user.roles.cache.array().toString() }
                        )
                        .setFooter('Look at this hottie! Type ".me -add --help" to see available custom fields you can add');

                    if (JObject.hasOwnProperty(user.user.id)) {
                        for (var i = 0; i < Object.keys(JObject[user.user.id]).length; i++) {
                            if (JObject[msg.author.id][Object.keys(JObject[user.user.id])[i]] === '') {
                                delete JObject[msg.author.id][Object.keys(JObject[user.user.id])[i]];
                                FileSystem.writeFileSync('./Assets/Data/me.json', JSON.stringify(JObject, null, 2));
                            } else {
                                embed.addField(Object.keys(JObject[user.user.id])[i], JObject[msg.author.id][Object.keys(JObject[user.user.id])[i]]);
                            }
                        }
                    }

                    if (JObject.hasOwnProperty(user.user.id)) {
                        if (JObject[user.user.id].hasOwnProperty("EmbedStripColor")) {
                            embed.setColor(JObject[user.user.id]["EmbedStripColor"]);
                        }
                    } else {
                        embed.setColor('#ffffff');
                    }
                    
                    msg.channel.send(embed);
                });
            } else { // Dumbass can't trype eeeeeeee
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Usage')
                    .setColor(Status.StatusColor('ERROR'))
                    .addFields(
                        { name: 'Bracket Definitions', value: '{Required} [optional]' },
                        { name: 'me {@username} [@username2] [@username3]...', value: 'Gets info on that user.' }
                    )
                    .setFooter(Status.InvalidCommandMessage())
                );
            }
        }
        return true;
    }
}