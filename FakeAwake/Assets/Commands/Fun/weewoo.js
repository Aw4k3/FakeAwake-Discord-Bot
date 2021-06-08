const Discord = require('discord.js');
const Status = require('../../include/status.js');
const WebClient = require('../../include/webclient.js');
const Utils = require('../../include/utils.js');
const Sharp = require('sharp');
const FileSystem = require('fs');
const Vector = require('three');

var ColorOverlay = false,
    HasProfileImage = true,
    OverlayColor = new Vector.Color(0, 0, 0);

module.exports = {
    name: 'weewoo',
    description: 'Send that horny suspect right to horny jail. Kappa',
    execute(msg, args) {
        for (var i = 0; i < args.length; i++) {
            switch (args[i]) {
                // This was just never finished
                // and will probably never be finished
                case '-rgb':
                    var R = parseInt(args[i + 1]) || false,
                        G = parseInt(args[i + 2]) || false,
                        B = parseInt(args[i + 3]) || false;

                    if (!R || !G || !B) { // Are all RGB values valid?
                        msg.channel.send('Invalid RGB, color will not be adjusted.');
                    } else {
                        OverlayColor = new Vector.Color(R, G, B); // Normalize values and create color
                        ColorOverlay = true;
                    }
                    break;
            }
        }

        if (msg.mentions.members.size) {
            var user = msg.mentions.members.first();
            /*********** Log User ***********/
            console.log('[File System] Reading ./Assets/Data/HornyJail.json');
            var JObject = JSON.parse(FileSystem.readFileSync('./Assets/Data/HornyJail.json', 'utf8'));
            //console.log(JObject);
            if (!JObject['Inmates'].hasOwnProperty(user.user.username)) {
                JObject['Inmates'][user.user.username] = 1;
                console.log(Utils.getTimeStamp() + '[JSON] Logged ' + user.user.username + 'to ./Assets/Data/HornyJail.json with value' + JObject['Inmates'][user.user.username]);
            } else {
                JObject['Inmates'][user.user.username] = JObject['Inmates'][user.user.username] + 1;
            }

            FileSystem.writeFileSync('./Assets/Data/HornyJail.json', JSON.stringify(JObject, null, 2));

            /*********** Set default profile image incase user doesn't have a profile image Kappa ***********/
            var link = user.user.avatarURL() || 'https://harry.gg/forums/uploads/default/original/2X/f/f812e1fa53f09edb629ae7f128746118b2da94c5.png'

            /*********** Download users profile image ***********/
            console.log(Utils.getTimeStamp() + '[Download] Downloading profile image of ' + user.user.username);
            WebClient.DownloadFile(link, './Assets/temp/avatar128.webp', function () {
                console.log(Utils.getTimeStamp() + '[Download] Avatar URL: ' + user.user.avatarURL());
                console.log(Utils.getTimeStamp() + '[Download] Downloaded profile image of ' + user.user.username);

            /*********** Composite Images ***********/
                if (ColorOverlay) {
                    Sharp({
                        create: {
                            width: 512,
                            height: 512,
                            channels: 3,
                            background: { r: OverlayColor.r, g: OverlayColor.g, b: OverlayColor.b }
                        }
                    }).toFile('./Assets/temp/OverlayColor.png')
                    Sharp('./Assets/temp/avatar128.webp').resize(256, 256).toFile('./Assets/temp/avatar256.png').then(composite => {
                        Sharp('./Assets/Images/PinkJailCell.png')
                            .composite([
                                {
                                    input: './Assets/temp/OverlayColor.png',
                                    blend: 'overlay'
                                },
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
                        /*********** Send Embed ***********/
                        msg.channel.send(new Discord.MessageEmbed()
                            .setTitle('Horny Jail')
                            .setDescription(user.displayName + ' has been weewoo\'d to horny jail')
                            .setColor('#ff00c3')
                            .attachFiles(['./Assets/Images/PinkJailCell.png', './Assets/temp/comp.png'])
                            .setThumbnail('attachment://PinkJailCell.png')
                            .setImage('attachment://comp.png')
                            .setFooter('This mans was a bit too horny Kappa')
                        );

                    });
                } else {
                    Sharp('./Assets/temp/avatar128.webp').resize(256, 256).toFile('./Assets/temp/avatar256.png').then(composite => {
                        Sharp('./Assets/Images/PinkJailCell.png')
                            .composite([
                                {
                                    input: './Assets/temp/avatar256.png',
                                    gravity: 'center'
                                },
                                /*{
                                    input: './Assets/Images/TopRibbon.png',
                                    top: 0,
                                    left: 0
                                },
                                {
                                    input: './Assets/Images/IconRibbons.png',
                                },
                                {
                                    input: './Assets/Images/Bunnies.png',
                                },*/
                                {
                                    input: './Assets/Images/PinkCellBars.png'
                                }
                            ])
                            .toFile('./Assets/temp/comp.png', function (e) { console.log(Utils.getTimeStamp() + e) });
                    }).then(sendit => {
                        /*********** Send Embed ***********/
                        msg.channel.send(new Discord.MessageEmbed()
                            .setTitle('Horny Jail')
                            .setDescription(user.displayName + ' has been weewoo\'d to horny jail')
                            .setColor('#ff00c3')
                            .attachFiles(['./Assets/Images/PinkJailCell.png', './Assets/temp/comp.png'])
                            .setThumbnail('attachment://PinkJailCell.png')
                            .setImage('attachment://comp.png')
                            .setFooter('This mans was a bit too horny Kappa')
                        );

                    });
                }

            /* Clean up
             * This bit breaks the bot
             * Why is Javascript so shit
             * I can't download a new image without an existing one
             * Deleting these will just CATASTROPHICALLY BREAK EVERYTHING
             */
                //FileSystem.unlinkSync('./Assets/temp/avatar128.webp');
                //FileSystem.unlinkSync('./Assets/temp/avatar256.png');
                //FileSystem.unlinkSync('./Assets/temp/comp.png');
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