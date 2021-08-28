const Discord = require('discord.js');
const FileSystem = require('fs');
const Status = require('../../include/status.js');
const Utils = require('../../include/utils.js');
const Fuse = require('fuse.js')

const BOT_ID = '707698652076048406';
const SoundList = FileSystem.readdirSync('./Assets/Audio');
var SoundListEmbeds = [];
var connection;

var count = 0; // Page item count thing
while (count < SoundList.length) { // While count is less than length of list in 10s
    var tempList = []; // Create temporary list to store sounds
    let SoundListEmbed = new Discord.MessageEmbed() // Create Embed
        .setTitle('Soundboard')
        .setDescription('List of available sounds and commands')
        .setColor(Status.StatusColor('OK'));

    for (var i = 0; i < 10; i++) {
        if (count + i < SoundList.length) {
            tempList.push(SoundList[count + i]); // Push sound list items to temp variable
        } else {
            break;
        }
    }

    SoundListEmbed.addField('Sounds', tempList.join('\n')); // Add temp list to embed
    if (count + 10 > SoundList.length) {
        SoundListEmbed.setFooter(`${count} - ${SoundList.length}`)
    } else {
        SoundListEmbed.setFooter(`${count} - ${count + 10}`)
    }
    SoundListEmbeds.push(SoundListEmbed); // Push Embed to Embed List

    count += 10;
}

async function PlaySound(msg, soundfile) {
    if (msg.member.voice.channel) {
        connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(`./Assets/Audio/${soundfile}`)
        var Duration = 0;
        
        dispatcher.on('start', () => {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('🎵 Soundboard')
                .setColor(Status.StatusColor('OK'))
                .setDescription(`Now playing **${soundfile}**\nDuration ${Duration} seconds.`)
            );

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
    description: 'Has sounds innit',
    execute(msg, args, client) {
        if (args.length < 2) {
            msg.channel.send(SoundListEmbeds[0]).then(sbl => {
                sbl.react('⬅');
                sbl.react('➡');

                i = 1;

                client.on('messageReactionAdd', (reaction, user) => {
                    if (reaction.message.id === sbl.id && user.id !== BOT_ID) {
                        switch (reaction._emoji.name) {
                            case '➡':
                                if (i + 1 === SoundListEmbeds.length) { i = 0; } // End of list, loop back.
                                sbl.edit(SoundListEmbeds[i++]);
                                break;

                            case '⬅':
                                if (i - 1 < 0) { i = SoundListEmbeds.length - 1; } // End of list, loop back.
                                sbl.edit(SoundListEmbeds[i--]);
                                break;
                        }
                    }
                });

                client.on('messageReactionRemove', (reaction, user) => {
                    if (reaction.message.id === sbl.id && user.id !== BOT_ID) {
                        switch (reaction._emoji.name) {
                            case '➡':
                                if (i + 1 === SoundListEmbeds.length) { i = 0; } // End of list, loop back.
                                sbl.edit(SoundListEmbeds[i++]);
                                break;

                            case '⬅':
                                if (i - 1 < 0) { i = SoundListEmbeds.length - 1; } // End of list, loop back.
                                sbl.edit(SoundListEmbeds[i--]);
                                break;
                        }
                    }
                });
            });
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

            for (let i = 1; i < args.length; i++) {
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