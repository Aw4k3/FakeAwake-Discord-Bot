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
                // Beat Saber
                { name: '<a:PepoSabers:747199106262237284> Beat Saber', value: '`bs maplink` `bsr`' },

                // Fun
                { name: ':game_die: Fun', value: '`420` `69` `8ball` `awake` `audioplayer|ap|play|playsound` `bark` `bonk` `bork` `bubblewrap` `cbt` `chokemeplz|chokemepls|chokemeplease` `doomfish` `hate` `hornylog` `howdrunk` `howgay` `howhorny` `hug` `love` `oculus` `thisisfine|tif` `ratemypp` `roll` `sanity` `sb|soundboard` `trap` `waifu` `weewoo`' },

                // Image Tools
                { name: ':paintbrush: Image Tools', value: '`it newsolid` `it edit`' },

                // Utilites
                { name: ':gear: Utility', value: '`about` `choice` `math` `me` `ping` `randnum` `stringmanipulation|sm`' },
            )
            .setFooter('Commands List')
        );

        return true;
    }
}