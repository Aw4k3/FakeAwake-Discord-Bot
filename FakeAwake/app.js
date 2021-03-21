const Discord = require('discord.js');
const FileStream = require('fs');
const WebClient = require('request');
const Sharp = require('sharp');

const Token = FileStream.readFileSync('D:/FakeAwake Token.txt', 'utf8');

function getTimeStamp() {
    var DateTime = new Date();
    
    return `[${("0" + DateTime.getDate()).slice(-2)}/${("0" + (DateTime.getMonth() + 1)).slice(-2)}/${DateTime.getFullYear()} ${("0" + DateTime.getHours()).slice(-2)}:${("0" + DateTime.getMinutes()).slice(-2)}:${("0" + DateTime.getSeconds()).slice(-2)}] `;
}
/**************************** Init Bot ****************************/
const client = new Discord.Client();
const prefix = '.';

/**************************** Setup Commands ****************************/
client.commands = new Discord.Collection();

console.log(getTimeStamp() + '[Command Handler] Loading commands.')

function EnumerateDirectories(path) {
    var Directories = FileStream.readdirSync(path, { withFileTypes: true })
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
for (var i = 0; i < commandDirs.length; i++) {                                                       // Go through each directory
    var temp = FileStream.readdirSync(commandDirs[i]).filter(files => files.endsWith('.js'))         // Load command files from directory
    for (var j = 0; j < temp.length; j++) {                                                          // Get each file's path
        commandFiles.push(commandDirs[i] + '/' + temp[j]);                                           // Push path to array
        console.log(getTimeStamp() + '[Command Handler] Found ' + commandDirs[i] + '/' + temp[j]);   // Log findings
    }
}

// Push commands to command collection
for (var file of commandFiles) {
    var command = require(file);
    client.commands.set(command.name, command);
    console.log(getTimeStamp() + '[Command Handler] Loaded ' + file);
}

console.log(getTimeStamp() + '[Command Handler] Found and loaded ' + commandFiles.length + ' commands.');

/**************************** End of Setup Commands ****************************/
Sharp.cache(false);

var MsgChainStack = [];
var IsFirstMessage = true;
var LastMessage;

client.on('ready', () => {
    console.log(`${getTimeStamp()}Logged in as ${client.user.tag}!`);
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

    console.log(getTimeStamp() + msg.author.tag + ' executed ' + msg.content);

    switch (args[0]) {
        default:
            msg.reply(`"${msg.content}" is not a command. Type ".help" for a list of commands.`);
            break;

        //Help command
        case 'help':
            if (client.commands.get('help').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('help').name}"`); }
            break;

        //Beat Saber
        case 'bs':
            if (args[1]) {
                switch (args[1]) {
                    case 'maplink':
                        if (client.commands.get('maplink').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('maplink').name}"`); }
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

        //Utility Commands
        case 'about':
            if (client.commands.get('about').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('about').name}"`); }
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

        case 'ping':
            if (client.commands.get('ping').execute(msg, args, client)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('ping').name}"`); }
            break;

        case 'randnum':
            if (client.commands.get('randnum').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('randnum').name}"`); }
            break;

        case 'sm': //String Manipluation
            if (client.commands.get('StringManipulation').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('StringManipulation').name}"`); }
            break

        //Fun Commands
        case "awake":
            if (client.commands.get('awake').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('awake').name}"`); }
            break;

        case 'bark':
            if (client.commands.get('bark').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('bark').name}"`); }
            break;

        case 'bonk':
            if (client.commands.get('bonk').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('bonk').name}"`); }
            break;

        case 'bork':
            if (client.commands.get('bork').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('bork').name}"`); }
            break;

        case 'hornylog':
            if (client.commands.get('hornylog').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('hornylog').name}"`); }
            break;

        case 'howdrunk':
            if (client.commands.get('howdrunk').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('howdrunk').name}"`); }
            break;

        case 'howgay':
            if (client.commands.get('howgay').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('howgay').name}"`); }
            break;

        case 'howhorny':
            if (client.commands.get('horny').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('horny').name}"`); }
            break;

        case 'love':
            if (client.commands.get('love').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('love').name}"`); }
            break;

        case 'ratemypp':
            if (client.commands.get('ratemypp').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('ratemypp').name}"`); }
            break;

        case 'roll':
            if (client.commands.get('roll').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('roll').name}"`); }
            break;

        case 'trap':
            if (client.commands.get('trap').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('trap').name}"`); }
            break;
        
        case 'weewoo':
            if (client.commands.get('weewoo').execute(msg, args)) { console.log(`${getTimeStamp()}[Command Handler] Successfully executed command "${client.commands.get('weewoo').name}"`); }
            break;

        case 'mute':
            if (msg.member.roles.cache.has('821048545062813696')) { //check for admin
                if (msg.mentions.members.size > 0) {
                    msg.mentions.members.forEach(user => {
                        user.roles.add('821046922223419453'); //give mute role
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

        case 'unmute':
            if (msg.mentions.members.size > 0) {
                msg.mentions.members.forEach(user => {
                    user.roles.remove('821046922223419453'); //remove mute role
                    msg.channel.send(user.displayName + ' has been unmuted');
                    var JObject = JSON.parse(FileStream.readFileSync('muted.json', 'utf8'));
                    delete JObject[user.user.username];
                    FileStream.writeFileSync('muted.json', JSON.stringify(JObject));
                });
            } else {
                msg.channel.send('No users were mentioned');
            }
            break;
    }

});

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get('816384463579643904').send(`Welcome <@${guildMember.user.id}> to our server! Make sure to check out the rules channel!`);
});

process.on('uncaughtException', (err, origin) => {
    console.log(`[Uncaught Exception] Caught exception: ${err}\n` + `Exception origin: ${origin}`);
    console.log(`[Uncaught Exception] Will continue to run as normal.`);
});

client.login(Token);