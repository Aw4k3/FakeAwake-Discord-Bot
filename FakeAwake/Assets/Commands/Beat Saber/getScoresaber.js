const Discord = require('discord.js');
const Status = require('../../include/status.js');
const FileSystem = require('fs');
//const ScoresaberAPI = require('scoresaber-api-client');

function MissingScoresaberProfile(user) {
    return new Discord.MessageEmbed()
        .setTitle('Scoresaber Profile')
        .setColor(Status.StatusColor('ERROR'))
        .addFields(
            { name: 'Bracket Definitions', value: '{Required} [optional]' },
            { name: `Scoresaber not linked for ${user.user}`, value: 'Sse ".me -add --scoresaber {link}" to link your account.' }
        )
        .setFooter(Status.InvalidCommandMessage());
}

module.exports = {
    name: 'getScoresaber',
    description: 'Gets link to the users scoresaber profile.',
    execute(msg, args) {
        if (msg.mentions.members.size) {
            const JObject = JSON.parse(FileSystem.readFileSync('./Assets/Data/me.json'));
            msg.mentions.members.foreach((user) => {
                if (JObject.hasOwnProperty(user.user.id)) {
                    if (JObject[user.user.id].hasOwnProperty("Scoresaber")) {
                        var x;
                    }
                } else {
                    MissingScoresaberProfile(user.user);
                }
            });
        } else {
            MissingScoresaberProfile(msg.author)
        }

        return true;
    }
}