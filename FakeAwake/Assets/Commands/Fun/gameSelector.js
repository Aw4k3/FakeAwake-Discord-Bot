const Discord = require('discord.js');
const FileSystem = require('fs');
const Status = require('../../include/status.js');
const Random = require('../../include/random.js');
const TicTacToe = require('../../Games/tictactoe.js');

module.exports = {
    name: 'gameSelector',
    description: 'Game selector for all the discord bot games',
    execute(msg, args, client) {
        if (args.length > 1) {
            switch (args[1]) {
                case 'tictactoe':
                    {
                        const inviteCode = Random.RandHex();
                        const PLAYER1_ID = msg.author.id;
                        msg.channel.send(new Discord.MessageEmbed()
                            .setTitle('Tic Tac Toe')
                            .setColor(Status.StatusColor('OK'))
                            .addFields(
                                { name: `Invite code: ${inviteCode}`, value: `Type **.game join ${inviteCode}** to vs ${msg.author}` }
                            )
                            .setFooter('Tic Tac Toe')
                        );

                        msg.channel.awaitMessages(m => m.content === `.game join ${inviteCode}`, { max: 1, time: 60000 }).then(collected => {
                            // var TTT = new TicTacToe();
                            // TTT.Initialize();
                            // TTT.Run();
                            TicTacToe.Initialize(msg.author.id, collected.first().author.id, client, msg);
                            TicTacToe.Run();
                        });
                    }
                    break;
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'game {game}', value: 'Become a gamer.' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }
    }
}