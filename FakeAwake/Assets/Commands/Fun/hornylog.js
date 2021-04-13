const Discord = require('discord.js');
const FileSystem = require('fs');

module.exports = {
    name: 'hornylog',
    description: 'Lists all the idots who managed to get themselves into horny jail. Smh.',
    execute(msg, args) {
        console.log('[File System] Reading ./Assets/Data/HornyJail.json');
        var JObject = JSON.parse(FileSystem.readFileSync('./Assets/Data/HornyJail.json', 'utf8'));
        var HornyJailList = new Discord.MessageEmbed()
            .setTitle('Horny Jail')
            .setDescription('Look at all those hornies. Kappa')
            .setColor('#ff00c3')
            .attachFiles(['./Assets/Images/PinkJailCell.png'])
            .setThumbnail('attachment://PinkJailCell.png')
            .setFooter('Some of them even made it in more than once');

        for (var object in JObject['Inmates']) {
            HornyJailList.addField(object, 'Jailed ' + JObject['Inmates'][object] + ' time(s)', true);
        }
        msg.channel.send(HornyJailList);

        return true;
    }
}