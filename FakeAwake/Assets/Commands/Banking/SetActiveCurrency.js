const Discord = require('discord.js');
const FileSystem = require('fs');
const Status = require('../../include/status.js');
const Banking = require('./Banking.js');

module.exports = {
    name: 'bankSetActiveCurrency',
    description: 'Set your active currency',
    execute(msg, args) {
        if (Banking.DoesUserExist(msg.author)) {
            if (Banking.Currencys.includes(args[2])) {
                Banking.SetActiveCurrency(msg.author, args[2]);
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('FakeAwake Banking')
                    .setColor(Status.StatusColor('OK'))
                    .attachFiles(['./Assets/Images/OnePoundCoin.png'])
                    .setThumbnail('attachment://OnePoundCoin.png')
                    .setDescription(`${msg.author}\nSet active currency to ${args[2]}!`)
                    .setFooter('Set current payment method')
                );
            } else {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Usage')
                    .setColor(Status.StatusColor('ERROR'))
                    .setDescription(`${args[2]} is not a valid Currency\n**Available Currency**\n${Banking.Currencys.join('\n')}`)
                    .setFooter(Status.InvalidCommandMessage())
                );
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'bank setactivecurrency {currency}', value: `**Available Currency**\n${Banking.Currencys.join('\n')}` }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}