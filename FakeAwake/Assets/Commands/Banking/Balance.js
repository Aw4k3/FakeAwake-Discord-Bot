const Discord = require('discord.js');
const FileSystem = require('fs');
const Status = require('../../include/status.js');
const Banking = require('./Banking.js');

module.exports = {
    name: 'bankBalance',
    description: 'View Balance',
    execute(msg, args) {
        const BankStats = JSON.parse(FileSystem.readFileSync(Banking.BankingStatsFile));
        
        if (msg.mentions.users.size) {
            msg.mentions.users.forEach(user => {
                if (Banking.DoesUserExist(user)) {
                    var DescriptionLines = [];

                    for (var i = 0; i < Object.keys(BankStats[user.id]["Balance"]).length; i++) {
                        DescriptionLines.push(`**${Object.keys(BankStats[user.id]["Balance"])[i]}**: ${BankStats[user.id]["Balance"][Object.keys(BankStats[user.id]["Balance"])[i]]}`);
                    }

                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('FakeAwake Banking')
                        .setColor('#808080')
                        .attachFiles(['./Assets/Images/OnePoundCoin.png'])
                        .setThumbnail('attachment://OnePoundCoin.png')
                        .setDescription(`${user}\n${DescriptionLines.join('\n')}`)
                        .setFooter('Mans Rich')
                    );
                } else {
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('FakeAwake Banking')
                        .setColor('#808080')
                        .attachFiles(['./Assets/Images/OnePoundCoin.png'])
                        .setThumbnail('attachment://OnePoundCoin.png')
                        .setDescription(`${user}, you do not have a bank account.\nOpen one by using .bank open`)
                        .setFooter('Mans Broke')
                    );
                }
            });
        } else {
            if (Banking.DoesUserExist(msg.author)) {
                var DescriptionLines = [];

                for (var i = 0; i < Object.keys(BankStats[msg.author.id]["Balance"]).length; i++) {
                    DescriptionLines.push(`**${Object.keys(BankStats[msg.author.id]["Balance"])[i]}**: ${BankStats[msg.author.id]["Balance"][Object.keys(BankStats[msg.author.id]["Balance"])[i]]}`);
                }

                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('FakeAwake Banking')
                    .setColor('#808080')
                    .attachFiles(['./Assets/Images/OnePoundCoin.png'])
                    .setThumbnail('attachment://OnePoundCoin.png')
                    .setDescription(`${msg.author}\n${DescriptionLines.join('\n')}`)
                    .setFooter('Mans Rich')
                );
            } else {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('FakeAwake Banking')
                    .setColor('#808080')
                    .attachFiles(['./Assets/Images/OnePoundCoin.png'])
                    .setThumbnail('attachment://OnePoundCoin.png')
                    .setDescription(`${msg.author}, you do not have a bank account.\nOpen one by using .bank open`)
                    .setFooter('Mans Broke')
                );
            }
        }

        return true;
    }
}