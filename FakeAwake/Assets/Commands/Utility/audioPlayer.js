const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Utils = require('../../include/utils.js');
const ytdl = require('ytdl-core');

var connection;

async function PlaySound(msg, url) {
    if (msg.member.voice.channel) {
        connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(ytdl(url, { filter: 'audioonly', quality: 'highestaudio' }));

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
    execute(msg, args, argsWithCase) {
        if (args.length > 1) {
            console.log(args[1]);
            if (args[1].includes('https://www.youtube.com/watch?v=') || args[1].includes('https://youtu.be/')) {
                PlaySound(msg, argsWithCase[1]);
            } else {
                for (var i = 1; i < args.length; i++) {
                    switch (args[i]) {
                        case '-leave':
                        case '-disconnect':
                        case '-dc':
                        case '-fuckoff':
                        case '-yeet':
                            connection.disconnect();
                            break;
                    }
                }
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'Flags', value: '-leave | -disconnect | -dc | -fuckoff | -yeet' },
                    { name: 'play {youtube link}', value: 'Plays audio from the provided youtube link.' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }
        return true;
    }
}