const Discord = require('discord.js');
const FileSystem = require('fs');
const Status = require('../../include/status.js');
const Random = require('../../include/random.js');

var IsBattleRunning = false;
var Enemies = FileSystem.readdirSync('C:/Users/Potato PC/Desktop/Hydras Fight Game/Enemies').filter(files => files.endsWith('.json'));
var PlayerDB = JSON.parse(FileSystem.readFileSync('C:/Users/Potato PC/Desktop/Hydras Fight Game/PlayerData.json', 'utf-8'));

class Move {
    Name = '';
    Type = '';
    Damage = 0;
    Description = '';

    constructor(name, type, damage, desc) {
        this.Name = name;
        this.Type = type;
        this.Damage = damage;
        this.Description = desc;
    }
}

class Player {
    Member = null;
    Level = 0;
    Health = 0;

    constructor(MessageAuthor) {
        this.Member = MessageAuthor;
        this.ReadStats();
    }

    ReadStats() {
        if (PlayerDB.hasOwnProperty(this.Member.id)) {
            this.Level = PlayerDB[this.Member.id]["Level"];
            this.Health = PlayerDB[this.Member.id]["Health"];
        } else {
            PlayerDB[this.Member.id] = {};
            PlayerDB[this.Member.id]["UserTag"] = this.Member.tag;
            PlayerDB[this.Member.id]["Level"] = this.Level;
            PlayerDB[this.Member.id]["Health"] = this.Health;
            // PlayerDB[this.Member.id] = `"UserTag: " ${this.Member.tag}`;
            console.log(PlayerDB);
            FileSystem.writeFileSync('C:/Users/Potato PC/Desktop/Hydras Fight Game/PlayerData.json', JSON.stringify(PlayerDB, null, 2));
        }
    }

    CreateEmbed() {
        return new Discord.MessageEmbed()
            .setTitle('Your Stats')
            .setDescription('Fappity Clappity, your bitch made me feel nutty!')
            .setThumbnail(this.Member.avatarURL())
            .setColor('#F92CFF')
            .addField(this.Member.tag, `**Level: **${this.Level}\n**Health: **${this.Health}\n`)
    }
}

class Enemy {
    Name = '';
    Level = 0;
    Health = 0;
    StaticEffect = 'none';
    Moves = [];
    jObject = '';
    IconPath = '';
    IconName = '';
    
    constructor(EnemyJSON) {
        this.jObject = JSON.parse(FileSystem.readFileSync(`C:/Users/Potato PC/Desktop/Hydras Fight Game/Enemies/${EnemyJSON}`, 'utf8'));
        this.Name = this.jObject["Name"];
        this.Level = this.jObject["Level"];
        this.Health = this.jObject["Health"];
        this.IconPath = this.jObject["Icon"];
        this.IconName = this.jObject["Icon"].split('/')[this.jObject["Icon"].split('/').length - 1];

        this.RandomizeMoveSets();
    }

    RandomizeMoveSets() {
        // Reset move list
        this.Moves = [];

        // Select four moves from the available moves from the enemies JSON file
        while (this.Moves.length < 4) {
            for (var i = 0; i < Object.keys(this.jObject["Moves"]).length; i++) {
                if (Random.RandBool()) {
                    let temp = this.jObject["Moves"][Object.keys(this.jObject["Moves"])[i]]; // Store move in variable for easier access and short code
                    let move = new Move(temp["Name"], temp["Type"], temp["Damage"], temp["Description"]); // Create new move instanace

                    if (!this.Moves.includes(move)) { // Check if that move is already in the list
                        this.Moves.push(move); // Add move to list
                    }
                }

                if (this.Moves.length === 4) { break; } // If the list containsi 4 moves, break.
            }
        }
    }

    CreateEmbed() {
        var MoveNames = [];

        for (var i = 0; i < this.Moves.length; i++) {
            MoveNames.push(this.Moves[i].Name);
        }

        var Embed = new Discord.MessageEmbed()
            .setTitle('Your Opponent')
            .setDescription('I know you are going to fap before you fight!')
            .attachFiles(this.IconPath)
            .setThumbnail(`attachment://${this.IconName}`)
            .setColor('#F92CFF')
            .addField(this.Name, `**Level: **${this.Level}\n**Health: **${this.Health}\n**Static Effect: **${this.StaticEffect}`)
            .addField('Moves', MoveNames.join('\n'));

        return Embed;
    }
}

module.exports = {
    name: 'hydraCodeTest',
    description: 'null',
    execute(msg, args) {
        switch (args[1]) {
            case 'start':
                var EnemyInstance = new Enemy(Enemies[Random.RandInt(0, Enemies.length)]);
                msg.channel.send(EnemyInstance.CreateEmbed());

                var PlayerInstance = new Player(msg.author);
                msg.channel.send(PlayerInstance.CreateEmbed());
                break; 
        }

        return true;
    }
}