const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Random = require('../../include/random');

module.exports = {
    name: 'StringManipulation',
    description: 'Provides tools for manipulating strings of characters.',
    execute(msg, args) {
        if (args.length > 1) {
            var temp = msg.content.replace('.sm ', '');

            var uwufy = msg.content.includes('-uwufy');
            var randomcase = msg.content.includes('-randomcase');
            var swapletters = msg.content.includes('-swapletters');
            var removeletters = msg.content.includes('-removeletters');
            var stroke = msg.content.includes('-stroke'); //Insert smug face
            var roadman = msg.content.includes('-roadman');

            if (uwufy) { temp = temp.replace('-uwufy', ''); }
            if (randomcase) { temp = temp.replace('-randomcase', ''); }
            if (swapletters) { temp = temp.replace('-swapletters', ''); }
            if (removeletters) { temp = temp.replace('-removeletters', ''); }
            if (stroke) {
                temp = temp.replace('-stroke', '');
                randomcase = true;
                swapletters = true;
                removeletters = true;
            }
            if (roadman) { temp = temp.replace('-roadman', ''); }

            if (roadman) {
                temp = temp.split(' ');
                for (var i = 0; i < temp.length; i++) { // Roadman
                    switch (true) {
                        case ['i', 'he', 'she', 'they', 'them'].inclues(temp[i]):
                            temp[i] = 'man';
                            break;

                        case ['house'].inclues(temp[i]):
                            temp[i] = 'ends';
                            break;
                    }
                }
            }

            var StringResult = temp.trim().split('');

            if (uwufy) {
                for (var i = 0; i < StringResult.length; i++) { // Uwufy
                    if (StringResult[i] === 'l' || StringResult[i] === 'r') {
                        StringResult[i] = 'w';
                    }
                }
            }

            if (randomcase) { //Random Case Letters
                for (var i = 0; i < StringResult.length; i++) {
                    if (Random.RandInt(0, 2) > 0) { // 0.5 Chance
                        StringResult[i] = StringResult[i].toUpperCase();
                    }
                }
            }

            if (swapletters) {
                for (var i = 0; i < StringResult.length - 1; i++) {
                    if (Random.RandInt(0, 101) < 32) { // 0.32 Chance
                        var Store = StringResult[i];
                        StringResult[i] = StringResult[i + 1];
                        StringResult[i + 1] = Store;
                        i += 5; //Increment I at the same time to maintain readability of the string
                    }
                }
            }

            if (removeletters) {
                for (var i = 0; i < temp.length - 1; i++) {
                    if (Random.RandInt(0, 101) < 20) { // 0.20 Chance
                        StringResult.splice(i, 1);
                    }
                }
            }

            msg.channel.send(StringResult.join(''));
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('String Manipulation')
                .setColor(Status.StatusColor('ERROR'))
                .attachFiles(['./Assets/Images/StringManipulationIcon.png'])
                .setThumbnail('attachment://StringManipulationIcon.png')
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'sm [flag] {contents}', value: 'We all know you just don\'t want to look like the only person who can\'t type.' },
                    { name: 'Available Flags', value: '-randomcase | -swapletters | -removeletters | -stroke | -uwufy' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}