const Discord = require('discord.js');
const FileSystem = require('fs');
const Sharp = require('sharp');
const readline = require('readline');
const Status = require('./Assets/include/status.js');
const Utils = require('./Assets/include/utils.js');
const Banking = require('./Assets/Commands/Banking/Banking.js');

const ConversationAI = require('./Assets/include/ConversationAI/autoLearn.js');

const DateTime = new Date();
const StartTime = DateTime.getTime();
const Token = FileSystem.readFileSync('D:/FakeAwake Token.txt', 'utf8');
const ReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**************************** Init Bot ****************************/
const client = new Discord.Client();
const prefix = '.';

function LoadCommands() {

    /**************************** Setup Commands ****************************/
    client.commands = new Discord.Collection();

    console.log(Utils.getTimeStamp() + '[Command Handler] Loading commands.');

    function EnumerateDirectories(path) {
        var Directories = FileSystem.readdirSync(path, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (var i = 0; i < Directories.length; i++) {
            Directories[i] = path + '/' + Directories[i];
        }

        return Directories;
    }

    var commandFiles = [],
        commandDirs = EnumerateDirectories('./Assets/Commands'); // Gets all folders in ./Assets/Commands
    commandDirs.push('./Assets/Commands'); // Add the root command folder itself

    //Enumerate Command Files
    for (var i = 0; i < commandDirs.length; i++) {                                                             // Go through each directory
        var temp = FileSystem.readdirSync(commandDirs[i]).filter(files => files.endsWith('.js'))               // Load command files from directory
        for (var j = 0; j < temp.length; j++) {                                                                // Get each file's path
            commandFiles.push(commandDirs[i] + '/' + temp[j]);                                                 // Push path to array
            console.log(Utils.getTimeStamp() + '[Command Handler] Found ' + commandDirs[i] + '/' + temp[j]);   // Log findings
        }
    }

    // Push commands to command collection
    for (var file of commandFiles) {
        var command = require(file);
        client.commands.set(command.name, command);
        console.log(Utils.getTimeStamp() + '[Command Handler] Loaded ' + file);
    }

    console.log(Utils.getTimeStamp() + '[Command Handler] Found and loaded ' + commandFiles.length + ' commands.');
}

LoadCommands();
/**************************** End of Setup Commands ****************************/
Sharp.cache(false);

var MsgChainStack = [];
var IsFirstMessage = true;
var LastMessage = new Discord.Message();

/**************************** Client Handler ****************************/
const Colors = [
    '#ff0000', // Red
    '#ff8000', // Orange
    '#ffff00', // Yellow
    '#80ff00', // Lime
    '#00ff00', // Green
    '#00ff80', // Cyan
    '#00ffff', // Light Blue
    '#0080ff', // Blue
    '#0000ff', // Dark Blue
    '#8000ff', // Purple
    '#ff00ff', // Pink
    '#ff0080', // Hot Pink
]
client.on('ready', () => {
    client.user.setActivity({
        /*
        type: 'WATCHING',
        name: 'hentai :)',
        url: 'https://nekos.life/'
        */
        name: 'monke'
    });

    console.log(`${Utils.getTimeStamp()}Loaded in ${(new Date().getTime() - StartTime) / 1000} seconds!`);
    console.log(`${Utils.getTimeStamp()}Logged in as ${client.user.tag}!`);

    //var colorIdx = 0;
    //setInterval(() => {
    //    /* Serenity's Server */
    //    client.guilds.cache.find(DiscordServer => DiscordServer.id === '713939972020764733').roles.cache.find(ServerRoles => ServerRoles.id === '831284413337305099').setColor(Colors[colorIdx]);
    //    client.guilds.cache.find(DiscordServer => DiscordServer.id === '713939972020764733').roles.cache.find(ServerRoles => ServerRoles.id === '734923766605414490').setColor(Colors[colorIdx]);

    //    /* Bot Testing Server */
    //    client.guilds.cache.find(DiscordServer => DiscordServer.id === '436914784676610078').roles.cache.find(ServerRoles => ServerRoles.id === '829130682261438496').setColor(Colors[colorIdx]);
    //    //console.log('color changed');

    //    /* Increment color index */
    //    if (colorIdx++ === Colors.length) { colorIdx = 0; }
    //}, 10000);
});

client.on('message', msg => {
    MsgCast = msg;
    Banking.TickBalance(msg.author);

    /* Message Chain Handler */
    if (IsFirstMessage) {
        LastMessage = msg;
        IsFirstMessage = false;
    }

    if (msg.content === LastMessage.content) { // If msg is the same as the previous
        MsgChainStack.push(msg.content);
        LastMessage = msg;
    } else { // If msg is not the same as the previous
        MsgChainStack = [];
        LastMessage = msg;
        MsgChainStack[0] = msg.content
    }

    if (MsgChainStack.length === 3) { // If a chain was made
        msg.channel.send(MsgChainStack[0]);
        MsgChainStack = [];
    }
    
    ConversationAI.AddToTrainingData(msg, LastMessage);

    /* Break message into args */
    if (!msg.content.startsWith(prefix) || msg.author.bot) return           // If the message doesn't have the prefix or is from a bot, dont to anything.
    const args = msg.content.slice(prefix.length).toLowerCase().split(' '); // Get the message, cut off the prefix, change to all lower case, split on space.
    const argsWithCase = msg.content.slice(prefix.length).split(' ');       // 

    /* Log input */
    console.log(Utils.getTimeStamp() + msg.author.tag + ' executed ' + msg.content);
    
    /* Execution */
    switch (args[0]) {
        /*default:
            msg.reply(`'${msg.content}' is not a command. Type '.help' for a list of commands.`);
            break;*/

    /******************* Help Command *******************/
        case 'help':
            if (client.commands.get('help').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('help').name}'`); }
            break;

        /******************* Fun Commands *******************/
        case 'bank':
        case 'banking':
            switch (args[1]) {
                case 'bal':
                case 'balance':
                case 'money':
                case 'monies':
                    if (client.commands.get('bankBalance').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('bankBalance').name}'`); }
                    break;

                case 'open':
                case 'create':
                case 'make':
                    if (client.commands.get('bankOpenAccount').execute(msg, argsWithCase)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('bankOpenAccount').name}'`); }
                    break;

                case 'activecurrency':
                case 'setactivecurrency':
                    if (client.commands.get('bankSetActiveCurrency').execute(msg, argsWithCase)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('bankSetActiveCurrency').name}'`); }
                    break;
            }
            break;

        case 'bal':
        case 'balance':
        case 'money':
        case 'monies':
            if (client.commands.get('bankBalance').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('bankBalance').name}'`); }
            break;
        /******************* Beat Saber Commands *******************/
        case 'bs':
            if (args[1]) {
                switch (args[1]) {
                    case 'maplink':
                    case 'ml':
                        if (client.commands.get('maplink').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('maplink').name}'`); }
                        break;

                    case 'pattern':
                        if (client.commands.get('bsPatternGenerator').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('bsPatternGenerator').name}'`); }
                        break;
                }
            } else {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Help -> Beat Saber')
                    .setColor('#7d46e3')
                    .addFields(
                        { name: 'Sub Commands', value: '`maplnk|ml` `pattern`' }
                    )
                    .setFooter('Commands List')
                );
            }
            break;

        case 'bsr':
            if (client.commands.get('maplink').execute(msg, args, true)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('maplink').name}'`); }if (args[1]) {
                switch (args[1]) {
                    case 'maplink':
                        
                        break;
                }
            } else {
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Help -> Beat Saber')
                    .setColor('#7d46e3')
                    .addFields(
                        { name: 'maplink', value: 'Makes a link you can click to take you to the map you desire. This command was made by an idiot and is not idiot proof so you can put what ever you want as the id' }
                    )
                    .setFooter('Commands List')
                );
            }
            break;

        /******************* Fun Commands *******************/
        case '420':
            if (client.commands.get('420').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('420').name}'`); }
            break;

        case '69':
            if (client.commands.get('69').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('69').name}'`); }
            break;

        case '8ball':
            if (client.commands.get('8ball').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('8ball').name}'`); }
            break;

        case 'awake':
            if (client.commands.get('awake').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('awake').name}'`); }
            break;

        case 'audioplayer':
        case 'ap':
        case 'play':
        case 'playsound':
            if (client.commands.get('audioPlayer').execute(msg, args, argsWithCase)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('audioPlayer').name}'`); }
            break;

        case 'bark':
            if (client.commands.get('bark').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('bark').name}'`); }
            break;

        case 'battle':
            if (client.commands.get('BattleMiniGame').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('BattleMiniGame').name}'`); }
            break;

        case 'bonk':
            if (client.commands.get('bonk').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('bonk').name}'`); }
            break;

        case 'bork':
            if (client.commands.get('bork').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('bork').name}'`); }
            break;

        case 'bubblewrap':
            if (client.commands.get('bubblewrap').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('bubblewrap').name}'`); }
            break;

        case 'cbt':
            if (client.commands.get('cbt').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('cbt').name}'`); }
            break;

        case 'chokemepls':
        case 'chokemeplz':
        case 'chokemeplease':
            if (client.commands.get('chokeMePlz').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('chokeMePlz').name}'`); }
            break;

        case 'doomfish':
            if (client.commands.get('doomfish').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('doomfish').name}'`); }
            break;

        case 'game':
            if (client.commands.get('gameSelector').execute(msg, args, client)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('gameSelector').name}'`); }
            break;

        case 'hate':
            if (client.commands.get('hate').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('hate').name}'`); }
            break;

        case 'hornylog':
            if (client.commands.get('hornylog').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('hornylog').name}'`); }
            break;

        case 'howdrunk':
            if (client.commands.get('howdrunk').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('howdrunk').name}'`); }
            break;

        case 'howgay':
            if (client.commands.get('howgay').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('howgay').name}'`); }
            break;

        case 'howhorny':
            if (client.commands.get('howhorny').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('howhorny').name}'`); }
            break;

        case 'hug':
            if (client.commands.get('hug').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('hug').name}'`); }
            break;

        case 'love':
            if (client.commands.get('love').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('love').name}'`); }
            break;

        case 'oculus':
            if (client.commands.get('oculus').execute(msg, args, argsWithCase)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('oculus').name}'`); }
            break;

        case 'tif':
        case 'thisisfine':
            if (client.commands.get('pikaThisIsFine').execute(msg, args, argsWithCase)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('pikaThisIsFine').name}'`); }
            break;

        case 'ratemypp':
            if (client.commands.get('ratemypp').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('ratemypp').name}'`); }
            break;

        case 'roll':
            if (client.commands.get('roll').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('roll').name}'`); }
            break;

        case 'sanity':
            if (client.commands.get('sanity').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('sanity').name}'`); }
            break;

        case 'soundboard':
        case 'sb':
            if (client.commands.get('soundboard').execute(msg, args, client)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('soundboard').name}'`); }
            break;

        case 'howsus':
            if (client.commands.get('howsus').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('howsus').name}'`); }
            break;

        case 'trap':
            if (client.commands.get('trap').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('trap').name}'`); }
            break;

        case 'waifu':
            if (client.commands.get('waifu').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('waifu').name}'`); }
            break;
        
        case 'weewoo':
            if (client.commands.get('weewoo').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('weewoo').name}'`); }
            break;

    /******************* Image Tools *******************/
        case 'imagetools':
        case 'img':
        case 'image':
        case 'it':
            switch (args[1]) {
                default:
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('Help > Image Tools')
                        .setColor(Status.StatusColor('ERROR'))
                        //.attachFiles(['./Assets/Images/Logo.png'])
                        //.setThumbnail('attachment://Logo.png')
                        .addFields(
                            { name: 'newsolid', value: 'Generate a new solid image' },
                            { name: 'edit', value: 'Basic image editing tools' }
                        )
                    );
                    break;
                case 'newsolid':
                    if (client.commands.get('newSolid').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('newSolid').name}'`); }
                    break;

                case 'edit':
                    if (client.commands.get('edit').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('edit').name}'`); }
                    break;
            }
            break;

    /******************* Utility Commands *******************/
        case 'about':
            if (client.commands.get('about').execute(msg, args, client)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('about').name}'`); }
            break;

        case 'choice':
            if (client.commands.get('choice').execute(msg, args, client)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('choice').name}'`); }
            break;

        case 'math':
            if (client.commands.get('math').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('math').name}'`); }
            break;

        case 'me':
            if (client.commands.get('me').execute(msg, args, argsWithCase)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('me').name}'`); }
            break;

        case 'ping':
            if (client.commands.get('ping').execute(msg, args, client)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('ping').name}'`); }
            break;

        case 'pet':
            if (client.commands.get('petGenerator').execute(msg, args, client)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('petGenerator').name}'`); }
            break;

        case 'randnum':
            if (client.commands.get('randnum').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('randnum').name}'`); }
            break;

        case 'stats':
            if (client.commands.get('getUserStats').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('getUserStats').name}'`); }
            break;

        case 'stringmanipulation':
        case 'sm': //String Manipluation
            if (client.commands.get('StringManipulation').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('StringManipulation').name}'`); }
            break

    /******************* Just Testing Stuff *******************/
        case 'ai':
            if (client.commands.get('testAI').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('testAI').name}'`); }
            break;

        case 'submitstroke':
            if (client.commands.get('submitstroke').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('submitstroke').name}'`); }
            break;

        case 'test':
            if (client.commands.get('EatTheThing').execute(msg, args, client)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('EatTheThing').name}'`); }
            break;

        case 'x':
            if (client.commands.get('hydraCodeTest').execute(msg, args, client)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command '${client.commands.get('hydraCodeTest').name}'`); }
            break;
    }
});

client.login(Token);

/**************************** Process Handler ****************************/
//Uncaught Exception Reporter
process.on('uncaughtException', (err, origin) => {
    console.log(`${Utils.getTimeStamp()}[Uncaught Exception] Caught exception: ${err}\n` + `${Utils.getTimeStamp()}[Uncaught Exception] Exception origin: ${origin}`);
    /*
    console.log(`${Utils.getTimeStamp()}[Self Revive] Restarting FakeAwake!`);
    
    client.destroy();
    client.login(Token);

    console.log(`${Utils.getTimeStamp()}[Self Revive] Done'd!`);
    */
});


async function sound() {
    client.channels.cache.get('855390674840191016').join().then(connection => {
        var dispatcher = connection.play('./Assets/Audio/welcome to osu.mp3');
        console.log(connection.voice.selfVideo);

        dispatcher.on('start', () => {
            console.log('Audio is now playing!');
        });

        dispatcher.on('finish', () => {
            console.log('Audio has finished playing!');
            connection.disconnect();
            connection.cleanup();
        });

        dispatcher.on('error', console.error);
    });
}

/**************************** Console Handler ****************************/
ReadLine.on('line', command => {
    const args = command.split(' ');

    switch (args[0]) {
        case 'send':
            var message = '';
            for (var i = 2; i < args.length; i++) {
                message += args[i] + ' ';
            }
            client.channels.cache.get(args[1]).send(message);
            break;

        case 'reload':
            LoadCommands();
            break;

        case 'joinvc':
            sound();
            break;

        case 'react':
            client.guilds.cache.get(args[1]).channels.cache.get(args[2]).messages.fetch(args[3]).then(msg => msg.react(args[4]));
            break;
    }
});