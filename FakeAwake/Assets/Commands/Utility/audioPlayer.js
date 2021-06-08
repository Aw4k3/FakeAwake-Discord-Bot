const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Utils = require('../../include/utils.js');

var connection;

async function PlaySound(msg, url) {
    if (msg.member.voice.channel) {
        connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(`${url}`)

        dispatcher.on('start', () => {
            console.log(`${Utils.getTimeStamp()}${url} is now streaming!`);
        });

        dispatcher.on('finish', () => {
            connection.disconnect();
            console.log(`${Utils.getTimeStamp()}${url} has finished streaming!`);
        });

        dispatcher.on('error', `${Utils.getTimeStamp()}${console.error}`);
    }
}

module.exports = {
    name: 'audioPlayer',
    description: 'Joins VC and plays Korone Thank you forever I\'m die',
    execute(msg, args) {
        if (args.length > 1) {
            for (var i = 1; i < args.length; i++) {
                switch (args[i]) {
                    case '-leave':
                    case '-disconnect':
                    case '-fuckoff':
                    case '-yeet':
                        connection.disconnect();
                        break;

                    default:
                        if (args[i].contains('https://www.youtube.com/watch?v=')) {
                            PlaySound(msg, args[i])
                        }
                        break;
                }
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'play {youtube link}', value: 'Plays audio from the provided youtube link.' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }
        return true;
    }
}