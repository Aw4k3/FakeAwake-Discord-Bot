const Discord = require('discord.js');
const FileSystem = require('fs');
const Status = require('../../include/status.js');
const Utils = require('../../include/utils.js');
const Fuse = require('fuse.js')

const SoundList = FileSystem.readdirSync('./Assets/Audio');
var connection;

async function PlaySound(msg, soundfile) {
    if (msg.member.voice.channel) {
        connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(`./Assets/Audio/${soundfile}`)

        dispatcher.on('start', () => {
            console.log(`${Utils.getTimeStamp()}${soundfile} is now playing!`);
        });

        dispatcher.on('finish', () => {
            connection.disconnect();
            console.log(`${Utils.getTimeStamp()}${soundfile} has finished playing!`);
        });

        dispatcher.on('error', `${Utils.getTimeStamp()}${console.error}`);
    }
}

module.exports = {
    name: 'soundboard',
    description: 'Joins VC and plays Korone Thank you forever I\'m die',
    execute(msg, args) {
        if (args.length < 2) {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Sound Board')
                .setDescription('List of available sounds and commands')
                .addFields(
                    { name: 'Sounds', value: SoundList.join('\n') }
            )
                .setColor(Status.StatusColor('OK'))
            )
        } else {
            for (var i = 1; i < args.length; i++) {
                switch (args[i]) {
                    case '-leave':
                    case '-disconnect':
                    case '-fuckoff':
                    case '-yeet':
                        connection.disconnect();
                        break;
                }
            }
            const fuse = new Fuse(SoundList);

            var searchString = '';

            for (var i = 1; i < args.length; i++) {
                searchString += args[i];
            }

            var searchReult = fuse.search(searchString.trim());
            if (SoundList.includes(searchReult[0]['item'])) {
                PlaySound(msg, searchReult[0]['item']);
            }
        }
        return true;
    }
}