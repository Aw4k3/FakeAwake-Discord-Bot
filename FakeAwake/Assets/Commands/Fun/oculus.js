const Discord = require('discord.js');

module.exports = {
    name: 'oculus',
    description: 'Oculus man',
    execute(msg, args) {

        msg.channel.send(new Discord.MessageAttachment('Assets/Gifs/oculustrash.gif'));

        return true;
    }
}