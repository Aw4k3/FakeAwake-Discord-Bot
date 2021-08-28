const Discord = require('discord.js');
const FileSystem = require('fs');
const Status = require('../../include/status.js');
const Banking = require('./Banking.js');

module.exports = {
    name: 'bankOpenAccount',
    description: 'Create a bank account',
    execute(msg, args) {
        if (args.length > 2) {
            // Create Entry for all given and accepted currencys
            for (var i = 2; i < args.length; i++) {
                if (Banking.Currencys.includes(args[i])) {
                    Banking.VerifyUser(msg.author, args[i]);

                    // Creation Successful (as long as I didn't fuck up the code)
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('FakeAwake Banking')
                        .setColor(Status.StatusColor('OK'))
                        .attachFiles(['./Assets/Images/OnePoundCoin.png'])
                        .setThumbnail('attachment://OnePoundCoin.png')
                        .setDescription(`${msg.author}\nAccount successfully opened for ${args[i]}!`)
                        .setFooter('Account Creation')
                    );
                } else {
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('Usage')
                        .setColor(Status.StatusColor('ERROR'))
                        .setDescription(`${args[i]} is not a valid Currency\n**Available Currency**\n${Banking.Currencys.join('\n')}`)
                        .setFooter(Status.InvalidCommandMessage())
                    );
                }
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'bank open {currency}', value: `**Available Currency**\n${Banking.Currencys.join('\n')}` }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}