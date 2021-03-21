const Discord = require('discord.js');
const Status = require('../include/status.js');
const Random = require('../include/random.js');

var HelpTitles = [
    'Linus Tech Tips',
    'Linus Sex Tips',
    'Linus Finger Tips',
    'Oculus Support',
    'Steam Support',
    'Big Bojo Hotline (Boris Johnson)',
    'Billy\'s guide on how to get Waifus'
];

module.exports = {
    name: 'help',
    description: 'Returns help',
    execute(msg, args) {
        msg.channel.send(new Discord.MessageEmbed()
            .setTitle(HelpTitles[Random.RandInt(0, 4)])
            .setColor(Status.StatusColor('OK'))
            .addFields(
                //Beat Saber
                { name: 'bs maplink', value: 'Gets beat saver link for the map of specified ID.' },

                //Fun
                { name: 'awake', value: 'Get links to Awake\'s stuff (no only fans tho :sadge:).' },
                { name: 'bark', value: 'Woof!' },
                { name: 'bonk', value: 'Bonks the specified user(s).' },
                { name: 'hornylog', value: 'Lists all the people sent who have been sent to horny jail.' },
                { name: 'howgay', value: 'Check how much percent gay someone is.' },
                { name: 'howhorny', value: 'Check how much percent horny someone is.' },
                { name: 'love', value: 'Loveometer.' },
                { name: 'ratemypp', value: 'Rate someone\' PP.' },
                { name: 'roll', value: 'Returns a random number between 0 ~ 100' },
                { name: 'trap', value: 'Felix says Hi!' },
                { name: 'weewoo', value: 'Send mentioned users to horny jail.' },

                //Utilites
                { name: 'about', value: 'Bot infos.' },
                { name: 'randnum', value: 'Generate a random int between a specified range.' },
                { name: 'ping', value: 'You get ponged.' },
                { name: 'sm', value: 'Provides string manipulation utilities.' }
            )
            .setFooter('Commands List')
        );

        return true;
    }
}