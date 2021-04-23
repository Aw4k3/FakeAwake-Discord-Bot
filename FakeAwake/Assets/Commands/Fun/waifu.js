const Discord = require('discord.js');
const Random = require('../../include/random.js');
const Utils = require('../../include/utils.js');
const Status = require('../../include/status.js');
const FileSystem = require('fs');
const Neko = require('nekos.life');

const Waifus = FileSystem.readdirSync('./Assets/Images/Waifus');
const Lewd = FileSystem.readdirSync('./Assets/Images/Waifus/Lewd')
const NekoClient = new Neko();


module.exports = {
    name: 'waifu',
    description: 'Cute Waifus',
    execute(msg, args) {
        /* Create Embed */
        var NekoEmbed = new Discord.MessageEmbed()
            .setTitle('Heard you like Waifus')
            .setDescription(`Neko`)
            .setColor('#edd6ff')
            .setFooter(`${msg.author.username} summoned a waifu. PauseChamp`);

        if (args.length === 1) {
            NekoClient.sfw.waifu().then(image => {
                console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                NekoEmbed.setDescription('Waifu');
                NekoEmbed.setImage(image.url);
            }).then(fuckyoujavascript => {
                msg.channel.send(NekoEmbed);
            });
        } else {
            for (var i = 0; i < args.length; i++) {
                switch (args[i]) {

                    case '-avatar':
                        NekoClient.sfw.avatar().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Avatar');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-baka':
                        NekoClient.sfw.baka().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Baka');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-cuddle':
                        NekoClient.sfw.cuddle().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Cuddle');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-feed':
                        NekoClient.sfw.feed().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Feed');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-foxgirl':
                        NekoClient.sfw.foxGirl().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Fox Girl');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-gecg':
                        NekoClient.sfw.gecg().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Genetically Engineered Catgirl');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-gif':
                        NekoClient.sfw.nekoGif().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Animated');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-goose':
                        NekoClient.sfw.goose().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Goose?');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-holo':
                        NekoClient.sfw.holo().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Holo');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-kemonomimi':
                        NekoClient.sfw.kemonomimi().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Kemonomimi');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-kiss':
                        NekoClient.sfw.kiss().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Kiss');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-lewd':
                        idx = Random.RandInt(0, Lewd.length);
                        NekoEmbed.setDescription('Lewd');
                        NekoEmbed.attachFiles([`./Assets/Images/Waifus/Lewd/${Lewd[idx]}`]);
                        NekoEmbed.setImage(`attachment://${Lewd[idx]}`);
                        msg.channel.send(NekoEmbed);
                        break;

                    case '-meow':
                        NekoClient.sfw.meow().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Meow');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-mio':
                        NekoEmbed.setDescription('Just for Jk');
                        NekoEmbed.attachFiles(['./Assets/Images/mio.gif'])
                        NekoEmbed.setImage('attachment://mio.gif');
                        msg.channel.send(NekoEmbed);
                        break;

                    case '-neko':
                        NekoClient.sfw.neko().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Neko');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-pat':
                        NekoClient.sfw.pat().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Pat');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-poke':
                        NekoClient.sfw.poke().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Poke');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-slap':
                        NekoClient.sfw.slap().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Slap');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-smug':
                        NekoClient.sfw.smug().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Smug');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-tickle':
                        NekoClient.sfw.tickle().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Tickle');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-wallpaper':
                        NekoClient.sfw.wallpaper().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('Wallpaper');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case '-woof':
                        NekoClient.sfw.woof().then(image => {
                            console.log(Utils.getTimeStamp() + 'Fetched url ' + image.url);
                            NekoEmbed.setDescription('A dooge?');
                            NekoEmbed.setImage(image.url);
                        }).then(fuckyoujavascript => {
                            msg.channel.send(NekoEmbed);
                        });
                        break;

                    case 'flags':
                        msg.channel.send(new Discord.MessageEmbed()
                            .setTitle('Waifu Flags (I will NOT be adding proper NSFW support)')
                            .setDescription('waifu [-flag]')
                            .setColor(Status.StatusColor('OK'))
                            .addFields(
                                { name: 'Flags', value: '-avatar | -baka | -cuddle | -feed | -foxgirl | -gecg | -gif | -goose | -holo | -kemonomimi | -kiss | -lewd | -meow | -neko | -pat | -poke | -slap | -smug | -tickle | -wallpaper | -woof' },
                            )
                            .setFooter('I exist :)')
                        );
                        break
                }
            }
        }

        return true;
    }
}
