const { randomInt } = require('crypto');
const Discord = require('discord.js');
const FileStream = require('fs');
const WebClient = require('request');
const Sharp = require('sharp');
//const GoogleAPI = require('googleapis');

const Token = FileStream.readFileSync('D:/FakeAwake Token.txt', 'utf8');
//const GoogleApiToken = FileStream.readFile('D:/FakeAwake GoogleAPI Token.json')

const client = new Discord.Client();
const prefix = '.';
Sharp.cache(false);

//Setup bot functions
var InvalidCommandMessage = 'User entered invalid command.';

function RandFloat(min, max) {
    return min + Math.random() * Math.floor(max - min); //Inclusive Min, Exclusive Max
}

function RandInt(min, max) {
    return min + Math.floor(Math.random() * Math.floor(max - min)); //Inclusive Min, Exclusive Max
}

function GetChanges(major, minor, patch) {
    var ChangeLog = JSON.parse('./ChangeLog.json');
    console.log(ChangeLog);
}

function DownloadFile(uri, filename, callback) {
    WebClient.head(uri, function (err, res, body) {
        console.log('[Download] content-type:', res.headers['content-type']);
        console.log('[Download] content-length:', res.headers['content-length']);

        WebClient(uri).pipe(FileStream.createWriteStream(filename)).on('close', callback);
    });
};

var StatusColors = [
    '#ff0000', //Error - Red
    'ffff00',  //Warning - Yellow
    '7d46e3'   //OK - Purple
]

var HelpTitles = [
    'Linus Tech Tips',
    'Linus Sex Tips',
    'Linus Finger Tips',
    'Oculus Support',
    'Steam Support',
    'Big Bojo Hotline (Boris Johnson)',
    'Billy\' guide on how to get Waifus'
];

var MsgChainStack = [];
var IsFirstMessage = true;
var LastMessage;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    if (IsFirstMessage) {
        LastMessage = msg.content;
        IsFirstMessage = false;
    }


    if (msg.content === LastMessage) {
        MsgChainStack.push(msg.content);
        LastMessage = msg.content;
    } else {
        while (MsgChainStack.length > 0) {
            MsgChainStack.pop();
        }
        LastMessage = msg.content;
        MsgChainStack[0] = msg.content
    }

    if (MsgChainStack.length === 3) {
        msg.channel.send(MsgChainStack[0]);
        while (MsgChainStack.length > 0) {
            MsgChainStack.pop();
        }
    }

    if (!msg.content.startsWith(prefix) || msg.author.bot) return

    const args = msg.content.slice(prefix.length).toLowerCase().split(' ');

    switch (args[0]) {
        //Help command
        case 'help':
            switch (args[1]) {
                default:
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle(HelpTitles[RandInt(0, 4)])
                        .setColor('#7d46e3')
                        .addFields(
                            //Utilites
                            { name: 'about', value: 'Bot infos.' },
                            { name: 'randnum', value: 'Generate a random int between a specified range.' },
                            { name: 'sm', value: 'Provides string manipulation utilities.' },

                            //Fun
                            { name: 'awake', value: 'Get links to Awake\'s stuff (no only fans tho :sadge:).' },
                            { name: 'ping', value: 'You get ponged.' },
                            { name: 'bark', value: 'Woof!' },
                            { name: 'roll', value: 'Returns a random number between 0 ~ 100' },
                            { name: 'howgay', value: 'Check how much percent gay someone is.' },
                            { name: 'howhorny', value: 'Check how much percent horny someone is.' },
                            { name: 'ratemypp', value: 'Rate someone\' PP.' },
                            { name: 'trap', value: 'Felix says Hi!' },
                            { name: 'uwufy', value: 'UwUfy and sentence. You Weeb!' },
                            { name: 'weewoo', value: 'Send mentioned users to horny jail.' }
                        )
                        .setFooter('Commands List')
                    );
                    break;
                case 'sm':
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('String Manipulation')
                        .setColor(StatusColors[0])
                        .attachFiles(['./Assets/Images/StringManipulationIcon.png'])
                        .setThumbnail('attachment://StringManipulationIcon.png')
                        .addFields(
                            { name: 'Bracket Definitions', value: '{Required} [optional]' },
                            { name: prefix + 'sm [flag] {contents}', value: 'We all know you just don\'t want to look like the only person who can\'t type.' },
                            { name: 'Available Flags', value: '-randomcase | -swapletters | -removeletters | -stroke' }
                        )
                        .setFooter(InvalidCommandMessage)
                    );
                    break;
            }
            break;

        //Beat Saber
        case 'bs':
            if (args[1]) {
                switch (args[1]) {
                    case 'maplink':
                        if (args[2]) {
                            msg.channel.send('https://beatsaver.com/beatmap/' + args[2]);
                        } else {
                            msg.channel.send(new Discord.MessageEmbed()
                                .setTitle('BeatSaver Map Linker Grabber')
                                .setColor(StatusColors[0])
                                .addFields(
                                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                                    { name: prefix + 'bs maplink {map id}', value: 'Makes a link you can click to take you to the map you desire. This command was made by an idiot and is not idiot proof so you can put what ever you want as the id' }
                                )
                                .setFooter(InvalidCommandMessage)
                            );
                        }
                        break;
                }
            } else {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Help > Beat Saber')
                    .setColor('#7d46e3')
                    .addFields(
                        { name: 'maplink', value: 'Makes a link you can click to take you to the map you desire. This command was made by an idiot and is not idiot proof so you can put what ever you want as the id' }
                    )
                    .setFooter('Commands List')
                );
            }
            break;

        //Utility Commands
        case 'about':
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('FakeAwake Discord Bot')
                .setColor(StatusColors[2])
                .addFields(
                    { name: 'Created On', value: 'February 24, 2021' },
                    { name: 'Created By', value: 'Awake#4642' }
                )
                .setFooter('I exist :)')
            );
            break;

        case 'changelog':
            msg.mentions.members.forEach(user =>
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('FakeAwake Bot')
                    .setDescription('Developed by Awake')
                    .setColor(StatusColors[2])
                    .attachFiles(['./Assets/Images/Logo.png'])
                    .setThumbnail('attachment://Logo.png')
                    .addFields(
                        { name: 'Version 1.0.0', value: GetChanges(1, 0, 0) }
                    )
                ));
            break;

        case 'randnum':
            //Parameters: int lower, int upper
            if (args[1] && args[2]) {
                try {
                    var lower;
                    var upper;
                    var result;

                    //Pre calculate for int for efficiency
                    lower = parseInt(args[1]);
                    upper = parseInt(args[2]);
                    result = RandInt(lower, upper + 1);

                    if (args[3]) {
                        switch (args[3]) {
                            case '-f': //float
                                lower = parseFloat(args[1]);
                                upper = parseFloat(args[2]);
                                result = RandFloat(lower, upper + 1.0);
                                msg.channel.send(new Discord.MessageEmbed()
                                    .setTitle('Generate Random Number')
                                    .setColor(StatusColors[2])
                                    .addFields(
                                        { name: 'Number', value: result }
                                    )
                                );
                                break;

                            case '-bin':
                                msg.channel.send(new Discord.MessageEmbed()
                                    .setTitle('Generate Random Number')
                                    .setColor(StatusColors[2])
                                    .addFields(
                                        { name: 'Number', value: result.toString(2) }
                                    )
                                );
                                break;

                            case '-hex':
                                msg.channel.send(new Discord.MessageEmbed()
                                    .setTitle('Generate Random Number')
                                    .setColor(StatusColors[2])
                                    .addFields(
                                        { name: 'Number', value: result.toString(16) }
                                    )
                                );
                                break;

                        }
                    } else {
                        //Random int is already pre calculated
                        msg.channel.send(new Discord.MessageEmbed()
                            .setTitle('Generate Random Int')
                            .setColor(StatusColors[2])
                            .addFields(
                                { name: 'Number', value: result }
                            )
                        );
                    }
                } catch (e) {
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('Generate Random Int')
                        .setColor(StatusColors[0])
                        .addFields(
                            { name: 'Bracket Definitions', value: '{Required} [optional]' },
                            { name: prefix + 'randnum {min} {max} [-f | -bin | -hex]', value: 'Returns a random number between the given range. Inclusive.' }
                        )
                        .setFooter(InvalidCommandMessage)
                    );
                }
            } else {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Generate Random Int')
                    .setColor(StatusColors[0])
                    .addFields(
                        { name: 'Bracket Definitions', value: '{Required} [optional]' },
                        { name: prefix + 'randnum {min} {max} [-f | -bin | -hex]', value: 'Returns a random number between the given range. Inclusive.' }
                    )
                    .setFooter(InvalidCommandMessage)
                );
            }
            break;

        case 'sm': //String Manipluation
            if (args.length > 1) {
                var temp = msg.content.replace('.sm ', '');

                var randomcase = msg.content.includes('-randomcase');
                var swapletters = msg.content.includes('-swapletters');
                var removeletters = msg.content.includes('-removeletters');
                var stroke = msg.content.includes('-stroke'); //Insert smug face

                if (randomcase) { temp = temp.replace('-randomcase', ''); }
                if (swapletters) { temp = temp.replace('-swapletters', ''); }
                if (removeletters) { temp = temp.replace('-removeletters', ''); }
                if (stroke) { temp = temp.replace('-stroke', ''); randomcase = true; swapletters = true; removeletters = true; }

                var StringResult = temp.trim().split('');

                if (randomcase) { //Random Case Letters
                    for (var i = 0; i < StringResult.length; i++) {
                        if (randomInt(0, 2) > 0) { // 0.5 Chance
                            StringResult[i] = StringResult[i].toUpperCase();
                        }
                    }
                }

                if (swapletters) {
                    for (var i = 0; i < StringResult.length - 1; i++) {
                        if (randomInt(0, 101) < 32) { // 0.32 Chance
                            var Store = StringResult[i];
                            StringResult[i] = StringResult[i + 1];
                            StringResult[i + 1] = Store;
                            i += 5; //Increment I at the same time to maintain readability of the string
                        }
                    }
                }

                if (removeletters) {
                    for (var i = 0; i < temp.length - 1; i++) {
                        if (randomInt(0, 101) < 20) { // 0.20 Chance
                            StringResult.splice(i, 1);
                        }
                    }
                }

                msg.channel.send(StringResult.join(''));
            } else {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('String Manipulation')
                    .setColor(StatusColors[0])
                    .attachFiles(['./Assets/Images/StringManipulationIcon.png'])
                    .setThumbnail('attachment://StringManipulationIcon.png')
                    .addFields(
                        { name: 'Bracket Definitions', value: '{Required} [optional]' },
                        { name: prefix + 'sm [flag] {contents}', value: 'We all know you just don\'t want to look like the only person who can\'t type.' },
                        { name: 'Available Flags', value: '-randomcase | -swapletters | -removeletters | -stroke' }
                    )
                    .setFooter(InvalidCommandMessage)
                );
            }
            break

        //Fun Commands
        case "awake":
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Awake\'s Links')
                .setColor('#7d46e3')
                .setURL('https://www.twitch.tv/awake_live')
                .addFields(
                    { name: 'Twitch', value: 'https://www.twitch.tv/awake_live' },
                    { name: 'YouTube', value: 'https://www.youtube.com/channel/UCIaFBHd0AOddEhocuG3YB5g' }
                )
                .setFooter('Hint: You should follow Awake on Twitch so you don\'t miss a stream')
            );
            break;

        case 'ping':
            msg.channel.send(new Discord.MessageEmbed()
                .addFields(
                    { name: 'Waiting for response', value: 'Waiting for response' }
                )
            ).then(PreMessage => {
                var BotLatency = PreMessage.createdTimestamp - msg.createdTimestamp;
                PreMessage.edit(
                    new Discord.MessageEmbed()
                        .setTitle('Pong!')
                        .setColor(StatusColors[2])
                        .addFields(
                            { name: 'Bot Latency', value: BotLatency + ' ms' },
                            { name: 'API Latency', value: client.ws.ping + ' ms' }
                        )
                        .setFooter("Latency Info")
                )
            });
            break;

        case 'bark':
            msg.channel.send("Woof!");
            break;

        case 'bork':
            msg.channel.send("Woof!");
            break;

        case 'roll':
            msg.reply('you rolled a ' + RandInt(0, 101));
            break;

        case 'howgay':
            if (msg.mentions.members.size) {
                msg.mentions.members.forEach(user =>
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('Gay Check')
                        .setColor(Math.floor(Math.random() * 16777215).toString(16))
                        .attachFiles(['./Assets/Images/GachiBallPride.png'])
                        .setThumbnail('attachment://GachiBallPride.png')
                        .addFields(
                            { name: user.displayName, value: RandInt(0, 101) + '% gay' }
                        )
                    ));
            } else {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Usage')
                    .setColor(StatusColors[0])
                    .addFields(
                        { name: 'Bracket Definitions', value: '{Required} [optional]' },
                        { name: prefix + 'howgay  {@username} [@username2] [@username3]...', value: 'Returns how gay the mentioned user is.' }
                    )
                    .setFooter(InvalidCommandMessage)
                );
            }
            break;

        case 'howhorny':
            var HornyRating = 0;
            if (msg.mentions.members.size) {
                msg.mentions.members.forEach(user => {
                    //Log User
                    var JObject = JSON.parse(FileStream.readFileSync('./Assets/Data/HornyJail.json', 'utf8'));
                    console.log(JObject);
                    if (!JObject['Inmates'].hasOwnProperty(user.user.username)) {
                        JObject['Inmates'][user.user.username] = 1;
                        console.log('[JSON] Logged ' + user.user.username + 'to ./Assets/Data/HornyJail.json with value' + JObject['Inmates'][user.user.username]);
                    } else {
                        JObject['Inmates'][user.user.username] = JObject['Inmates'][user.user.username] + 1;
                    }

                    //Rating
                    HornyRating = RandInt(0, 101);
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('Horny Check')
                        .setColor('#ff00c3')
                        .attachFiles(['./Assets/Images/awakeGasm.png'])
                        .setThumbnail('attachment://awakeGasm.png')
                        .addFields(
                            { name: user.displayName, value: HornyRating + '% horny' }
                        )
                    );
                    if (args[2] === '-trial' && parseInt(args[3]) < HornyRating) {
                        //Download users profile image
                        DownloadFile(user.user.avatarURL(), './Assets/temp/avatar128.webp', function () {
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
                    }
                });
            } else {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Usage')
                    .setColor(StatusColors[0])
                    .addFields(
                        { name: 'Bracket Definitions', value: '{Required} [optional]' },
                        { name: prefix + 'howhorny  {@username} [@username2] [@username3]...', value: 'Returns how horny the mentioned user is.' }
                    )
                    .setFooter(InvalidCommandMessage)
                );
            }
            break;

        case 'ratemypp':
            if (msg.mentions.members.size) {
                msg.mentions.members.forEach(user =>
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('PP Rater')
                        .setColor('#ff0000')
                        .attachFiles(['./Assets/Images/awakeGasm.png'])
                        .setThumbnail('attachment://awakeGasm.png')
                        .addFields(
                            { name: user.displayName, value: RandInt(0, 101) + '% PP Rating' }
                        )
                    ));
            } else {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Usage')
                    .setColor(StatusColors[0])
                    .addFields(
                        { name: 'Bracket Definitions', value: '{Required} [optional]' },
                        { name: prefix + 'ratemypp  {@username} [@username2] [@username3]...', value: 'How good is your PP.' }
                    )
                    .setFooter(InvalidCommandMessage)
                );
            }
            break;

        case 'trap':
            msg.channel.send('https://cdn.discordapp.com/attachments/706098244081680385/814173774114324500/Felix.png');
            break;

        case 'bonk':
            if (msg.mentions.users.size) {
                msg.mentions.users.forEach(
                    user => {
                        msg.channel.send(user.tag + ' was bonked by ' + msg.author.tag);
                    }
                );
            } else {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Usage')
                    .setColor(StatusColors[0])
                    .addFields(
                        { name: 'Bracket Definitions', value: '{Required} [optional]' },
                        { name: prefix + 'bonk  {@username} [@username2] [@username3]...', value: 'Bonks the entered users.' }
                    )
                    .setFooter(InvalidCommandMessage)
                );
            }
            break;

        case 'uwufy':
            var uwufied = msg.content.replace('.uwufy', '');
            var replaceLetters = ['l', 'r']

            //Do da ting
            for (var i = 0; i < replaceLetters.length; i++) {
                for (var j = 0; j < uwufied.length; j++) {
                    uwufied = uwufied.replace(replaceLetters[i], 'w');
                }
            }

            msg.channel.send(uwufied);
            break;

        case 'weewoo':
            if (msg.mentions.members.size) {
                msg.mentions.members.forEach(user => {
                    //Log User
                    var JObject = JSON.parse(FileStream.readFileSync('./Assets/Data/HornyJail.json', 'utf8'));
                    console.log(JObject);
                    if (!JObject['Inmates'].hasOwnProperty(user.user.username)) {
                        JObject['Inmates'][user.user.username] = 1;
                        console.log('[JSON] Logged ' + user.user.username + 'to ./Assets/Data/HornyJail.json with value' + JObject['Inmates'][user.user.username]);
                    } else {
                        JObject['Inmates'][user.user.username] = JObject['Inmates'][user.user.username] + 1;
                    }

                    FileStream.writeFileSync('./Assets/Data/HornyJail.json', JSON.stringify(JObject));

                    //Download users profile image
                    DownloadFile(user.user.avatarURL(), './Assets/temp/avatar128.webp', function () {
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
                    .setColor(StatusColors[0])
                    .addFields(
                        { name: 'Bracket Definitions', value: '{Required} [optional]' },
                        { name: prefix + 'weewoo {@username} [@username2] [@username3]...', value: 'Yeetus the mans to horny jail' }
                    )
                    .setFooter(InvalidCommandMessage)
                );
            }
            break;

        case 'hornylog':
            //List Users
            var JObject = JSON.parse(FileStream.readFileSync('./Assets/Data/HornyJail.json', 'utf8'));
            var HornyJailList = new Discord.MessageEmbed()
                .setTitle('Horny Jail')
                .setDescription('Look at all those hornies. Kappa')
                .setColor('#ff00c3')
                .attachFiles(['./Assets/Images/PinkJailCell.png'])
                .setThumbnail('attachment://PinkJailCell.png')
                .setFooter('Some of them even made it in more than once');

            for (var object in JObject['Inmates']) {
                HornyJailList.addField(object, 'Sentenced ' + JObject['Inmates'][object] + ' time(s)', true);
            }
            msg.channel.send(HornyJailList);
            break;

        case 'mute':
            if (msg.member.roles.cache.has('821048545062813696')) {
                if (msg.mentions.members.size > 0) {
                    msg.mentions.members.forEach(user => {
                        user.roles.add('821046922223419453');
                        msg.channel.send(user.displayName + ' has been muted');
                        var JObject = JSON.parse(FileStream.readFileSync('muted.json', 'utf8'));
                        JObject[user.user.username] = user.id;
                        FileStream.writeFileSync('muted.json', JSON.stringify(JObject));
                    });
                } else {
                    msg.channel.send('No users were mentioned');
                }
            } else {
                msg.reply('You ain\'t no admin, you sus!');
            }
            break;
    }

});

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get('816384463579643904').send(`Welcome <@${guildMember.user.id}> to our server! Make sure to check out the rules channel!`);
});

client.login(Token);