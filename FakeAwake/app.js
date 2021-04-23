const Discord = require('discord.js');
const FileSystem = require('fs');
const Sharp = require('sharp');
const Status = require('./Assets/include/status.js');
const Utils = require('./Assets/include/utils.js');
const readline = require('readline');

var Nyanners = JSON.parse('{"attackingmoves":{"Bite":[15,"Nyanners jumps out, surprising you, and sinks her one tooth into your skin"],"Scratch":[20,"Nyanners digs her claws into your skin"],"Punch Burst":[25,"Nyanners unleashes her power in a quick succession of powerful punches"],"Chest Bump":[20,"Nyanners rams herself against you, with all her force. Sadly it is not accompanied by a soft smack"]},"staticmoves":{"Screech":["Confusion","Nyanners unleashes a demonic screech which confuses you"],"Degradation":["Horniness","Nyanners insults you ;)"],"Joke":["Horniness","Nyanners increases your arousal with a sexy joke"],"Waifu Call":["Support","Nyanners calls for her Senpais and gains big pp energy"],"Lick":["Confusion","Nyanners suddenly jumps out and licks your cheeck living you in shock"]}}');

const a = Nyanners[Object.keys(Nyanners)[0]];
const b = Nyanners[Object.keys(Nyanners)[1]];

console.log(a[Object.keys(a)[0]][0]);

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
    commandDirs = EnumerateDirectories('./Assets/Commands');
commandDirs.push('./Assets/Commands');

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

/**************************** End of Setup Commands ****************************/
Sharp.cache(false);

var MsgChainStack = [];
var IsFirstMessage = true;
var LastMessage;
//const serialPort = new SerialPort('COM8', {baudRate: 115200});

/**************************** Init AI ****************************/


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
        type: 'WATCHING',
        name: 'hentai :)',
        url: 'https://nekos.life/'
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
    /* Message Chain Handler */
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

    /* Break message into args */
    if (!msg.content.startsWith(prefix) || msg.author.bot) return
    const args = msg.content.slice(prefix.length).toLowerCase().split(' ');

    /* Log input */
    console.log(Utils.getTimeStamp() + msg.author.tag + ' executed ' + msg.content);

    /* Execution */
    switch (args[0]) {
        /*default:
            msg.reply(`"${msg.content}" is not a command. Type ".help" for a list of commands.`);
            break;*/

    /******************* Help Command *******************/
        case 'help':
            if (client.commands.get('help').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('help').name}"`); }
            break;

    /******************* Beat Saber Commands *******************/
        case 'bs':
            if (args[1]) {
                switch (args[1]) {
                    case 'maplink':
                        if (client.commands.get('maplink').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('maplink').name}"`); }
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
        case "69":
            if (client.commands.get('69').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('69').name}"`); }
            break;

        case "8ball":
            if (client.commands.get('8ball').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('8ball').name}"`); }
            break;

        case "awake":
            if (client.commands.get('awake').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('awake').name}"`); }
            break;

        case 'bark':
            if (client.commands.get('bark').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('bark').name}"`); }
            break;

        case 'battle':
            if (client.commands.get('BattleMiniGame').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('BattleMiniGame').name}"`); }
            break;

        case 'bonk':
            if (client.commands.get('bonk').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('bonk').name}"`); }
            break;

        case 'bork':
            if (client.commands.get('bork').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('bork').name}"`); }
            break;

        case 'bubblewrap':
            if (client.commands.get('bubblewrap').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('bubblewrap').name}"`); }
            break;

        case 'hate':
            if (client.commands.get('hate').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('hate').name}"`); }
            break;

        case 'hornylog':
            if (client.commands.get('hornylog').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('hornylog').name}"`); }
            break;

        case 'howdrunk':
            if (client.commands.get('howdrunk').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('howdrunk').name}"`); }
            break;

        case 'howgay':
            if (client.commands.get('howgay').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('howgay').name}"`); }
            break;

        case 'howhorny':
            if (client.commands.get('howhorny').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('howhorny').name}"`); }
            break;

        case 'love':
            if (client.commands.get('love').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('love').name}"`); }
            break;

        case 'me':
            if (client.commands.get('me').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('me').name}"`); }
            break;

        case 'ratemypp':
            if (client.commands.get('ratemypp').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('ratemypp').name}"`); }
            break;

        case 'roll':
            if (client.commands.get('roll').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('roll').name}"`); }
            break;

        case 'sanity':
            if (client.commands.get('sanity').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('sanity').name}"`); }
            break;

        case 'trap':
            if (client.commands.get('trap').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('trap').name}"`); }
            break;

        case 'waifu':
            if (client.commands.get('waifu').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('waifu').name}"`); }
            break;
        
        case 'weewoo':
            if (client.commands.get('weewoo').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('weewoo').name}"`); }
            break;

    /******************* Image Tools *******************/
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
                    if (client.commands.get('newSolid').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('newSolid').name}"`); }
                    break;

                case 'edit':
                    if (client.commands.get('edit').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('edit').name}"`); }
                    break;
            }
            break;

    /******************* Utility Commands *******************/
        case 'about':
            if (client.commands.get('about').execute(msg, args, client)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('about').name}"`); }
            break;

        case 'changelog':
            msg.mentions.members.forEach(user =>
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('FakeAwake Bot')
                    .setDescription('Developed by Awake')
                    .setColor(Status.StatusColor('OK'))
                    .attachFiles(['./Assets/Images/Logo.png'])
                    .setThumbnail('attachment://Logo.png')
                    .addFields(
                        { name: 'Version 1.0.0', value: GetChanges(1, 0, 0) }
                    )
                ));
            break;

        case 'math':
            if (client.commands.get('math').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('math').name}"`); }
            break;

        case 'ping':
            //client.guilds.cache.array
            if (client.commands.get('ping').execute(msg, args, client)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('ping').name}"`); }
            break;

        case 'randnum':
            if (client.commands.get('randnum').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('randnum').name}"`); }
            break;

        case 'sm': //String Manipluation
            if (client.commands.get('StringManipulation').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('StringManipulation').name}"`); }
            break

    /******************* Just Testing Stuff *******************/
        case 'ai':
            if (client.commands.get('testAI').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('testAI').name}"`); }
            break;

        case 'submitstroke':
            if (client.commands.get('submitstroke').execute(msg, args)) { console.log(`${Utils.getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('submitstroke').name}"`); }
            break;
    }

    //Test code hints
    //msg.channel.awaitMessages()
    /*
    msg.channel.awaitMessages(m => m.content.length > 0, { max: 1, time: 30000, errors: ['time'] }).then(newmsg => {
        switch (newmsg.first().content) {
            case 'kk':
                msg.reply('no u');
                break;

            case 'oo':
                msg.reply('pee pee poo poo');
                break;
        }
    });
    */
});

client.login(Token);

/**************************** Process Handler ****************************/
//Uncaught Exception Reporter
process.on('uncaughtException', (err, origin) => {
    console.log(`${Utils.getTimeStamp()}[Uncaught Exception] Caught exception: ${err}\n` + `${Utils.getTimeStamp()}[Uncaught Exception] Exception origin: ${origin}`);
});

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
    }
});
