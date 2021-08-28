const Discord = require('discord.js');
const FileSystem = require('fs');

const StatsFilePath = './Assets/Data/UserStats.json';

function SpaceCaps(s = '') {
    var ss = '';
    for (var i = 0; i < s.length; i++) {
        if (/[A-Z]/.test(s[i])) {
            ss += ` ${s[i]}`;
        }
        else {
            ss += s;
        }
    }

    return ss;
}

module.exports = {
    name: 'getUserStats',
    description: 'Stats.',
    execute(msg, args) {
        console.log(`[File System] Reading ${StatsFilePath}`);
        var JObject = JSON.parse(FileSystem.readFileSync(StatsFilePath, 'utf8'));
        var Field = [];

        const MaybeOptimizeThisLaterIDK = [
            'breakdown',
            'extended',
            'more',
            'details',
            'detailed',
            'detail'
        ]

        if (msg.mentions.users.size > 0) {
            msg.mentions.users.forEach(user => {
                Field.push(user);
                if (MaybeOptimizeThisLaterIDK.includes(args[1])) { // Detailed version
                    for (let object in JObject[user.id]) {
                        if (object !== 'User') {
                            Field.push(`**${object}:** ${JObject[user.id][object]["Total"]}`);
                            for (var i = 0; i < Object.keys(JObject[user.id][object]).length; i++) {
                                Field.push(`> ${Object.keys(JObject[user.id][object])[i]}: ${JObject[user.id][object][Object.keys(JObject[user.id][object])[i]]}`)
                            }
                        }
                    }
                } else { // Simple Version
                    for (let object in JObject[user.id]) {
                        if (object !== 'User') {
                            Field.push(`**${object}:** ${JObject[user.id][object]["Total"]}`);
                        }
                    }
                }

                var StatsEmbed = new Discord.MessageEmbed()
                    .setTitle('Stats')
                    .setDescription(Field)
                    .setColor('#ffffff')
                    .attachFiles(['./Assets/Images/MissingTexture.png'])
                    .setThumbnail('attachment://MissingTexture.png')
                    .setFooter('Heard you like stats :)');


                msg.channel.send(StatsEmbed);

            });
        } else {
            Field.push(msg.author);
            if (MaybeOptimizeThisLaterIDK.includes(args[1])) { // Detailed version
                for (let object in JObject[msg.author.id]) {
                    if (object !== 'User') {
                        Field.push(`**${object}:** ${JObject[msg.author.id][object]["Total"]}`);
                        for (var i = 0; i < Object.keys(JObject[msg.author.id][object]).length; i++) {
                            Field.push(`> ${Object.keys(JObject[msg.author.id][object])[i]}: ${JObject[msg.author.id][object][Object.keys(JObject[msg.author.id][object])[i]]}`)
                        }
                    }
                }
            } else { // Simple Version
                for (let object in JObject[msg.author.id]) {
                    if (object !== 'User') {
                        Field.push(`**${object}:** ${JObject[msg.author.id][object]["Total"]}`);
                    }
                }
            }

            var StatsEmbed = new Discord.MessageEmbed()
                .setTitle('Stats')
                .setDescription(Field)
                .setColor('#ffffff')
                .attachFiles(['./Assets/Images/MissingTexture.png'])
                .setThumbnail('attachment://MissingTexture.png')
                .setFooter('Heard you like stats :)');


            msg.channel.send(StatsEmbed);
        }

        return true;
    }
}