const Discord = require('discord.js');
const Status = require('../../include/status.js');
const WebClient = require('../../include/webclient.js');
const Sharp = require('sharp');
const FileStream = require('fs');

module.exports = {
    name: 'weewoo',
    description: 'Send that horny suspect right to horny jail. Kappa',
    execute(msg, args) {
        if (msg.mentions.members.size) {
            msg.mentions.members.forEach(user => {
                //Log User
                console.log('[File System] Reading ./Assets/Data/HornyJail.json');
                var JObject = JSON.parse(FileStream.readFileSync('./Assets/Data/HornyJail.json', 'utf8'));
                //console.log(JObject);
                if (!JObject['Inmates'].hasOwnProperty(user.user.username)) {
                    JObject['Inmates'][user.user.username] = 1;
                    console.log('[JSON] Logged ' + user.user.username + 'to ./Assets/Data/HornyJail.json with value' + JObject['Inmates'][user.user.username]);
                } else {
                    JObject['Inmates'][user.user.username] = JObject['Inmates'][user.user.username] + 1;
                }

                FileStream.writeFileSync('./Assets/Data/HornyJail.json', JSON.stringify(JObject));

                //Download users profile image
                WebClient.DownloadFile(user.user.avatarURL(), './Assets/temp/avatar128.webp', function () {
                    console.log('[Download] Downloading profile image of ' + user.user.username);
                    console.log('[Download] Avatar URL: ' + user.user.avatarURL());
                    console.log('[Download] Downloaded profile image of ' + user.user.username);

                    //Composite Images
                    Sharp('./Assets/temp/avatar128.webp').resize(256, 256).toFile('./Assets/temp/avatar256.png').then(composite => {
                        Sharp('./Assets/Images/PinkJailCell.png')
                            .composite([
                                {
                                    input: './Assets/temp/avatar256.png',
                                    gravity: 'center'
                                },
                                {
                                    input: './Assets/Images/PinkCellBars.png'
                                }
                            ])
                            .toFile('./Assets/temp/comp.png', function (e) { console.log(e) });
                    }).then(sendit => {
                        //Send Embed
                        msg.channel.send(new Discord.MessageEmbed()
                            .setTitle('Horny Jail')
                            .setDescription(user.displayName + ' has been weewoo\'d to horny jail')
                            .setColor('#ff00c3')
                            .attachFiles(['./Assets/Images/PinkJailCell.png', './Assets/temp/comp.png'])
                            .setThumbnail('attachment://PinkJailCell.png')
                            .setImage('attachment://comp.png')
                            .setFooter('This mans was a bit too horny Kappa')
                        );

                        /* Clean up */
                        /* This bit breaks the bot, guess i will leave it commented out :( */
                        //FileStream.unlinkSync('./Assets/temp/avatar128.webp');
                        //FileStream.unlinkSync('./Assets/temp/avatar256.png');
                        //FileStream.unlinkSync('./Assets/temp/comp.png');

                    });
                });
            });
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'weewoo {@username} [@username2] [@username3]...', value: 'Yeetus the mans to horny jail' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}