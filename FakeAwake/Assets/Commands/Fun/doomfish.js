const Discord = require('discord.js');

module.exports = {
    name: 'doomfish',
    description: 'Doomfish man',
    execute(msg, args) {

        msg.channel.send(new Discord.MessageAttachment('Assets/Images/Doomfish.png'));

        return true;
    }
}