const Discord = require('discord.js');
const FileSystem = require('fs');
const Utils = require('../../include/utils.js');
const Random = require('../../include/random.js');

var inBattle = false;
const EMBED_TITLE = 'Battle';

class Character {
    Name = "";
    Age = 0;
    Health = 0;
    Moves = [];
    Healing = [];
    DamageBuffs = [];
    ActiveHealing = [];
    ActiveDamageBuffs = [];

    default = {
        "default": {
            "Name": "Default",
            "Age": 0,
            "Health": 0,
            "Moves": {
                "DefaultMoves": 0
            },
            "Abilities": {
                "Healing": {
                    "Generic Healing": 0
                },
                "DamageBuffs": {
                    "Generic Damage Buff": 1
                }
            }
        }
    };
    
    constructor(jObject = this.default, index = 0) {
        var key = Object.keys(jObject)[index];
        this.Name = jObject[key].Name;
        this.Age = jObject[key].Age;
        this.Health = jObject[key].Health;
        this.Moves = jObject[key].Moves;
        this.Healing = jObject[key]["Abilities"]["Healing"];
        this.DamageBuffs = jObject[key]["Abilities"]["DamageBuffs"];
    };
};

class ClassStats {
    Name = "";
    PlayCount = 0;
    Wins = 0;
    Loss = 0;

    constructor(CharacterName, jObject) {
        this.Name = CharacterName;
        this.PlayCount = jObject["Play Count"];
        this.Wins = jObject["Wins"];
        this.Loss = jObject["Loss"];
    }
}

class DamageBuff {
    Buff = "";
    Uses = 0;

    constructor(Buff, Uses) {
        this.Buff = Buff;
        this.Uses = Uses;
    }
}

class PlayerStats {
    StatsObject = JSON.parse(FileSystem.readFileSync('./Assets/Data/Battle/PlayerStats.json'));
    Name = "Template";
    Level = 0;
    XP = 0;
    LevelUpXP = 0;
    Wins = 0;
    Loss = 0;
    ClassStats = [];

    RequiredLevelUpXP() {
        return Math.round(0.87 * Math.pow(this.Level * 6, 2));
    }

    ReadStats(_Player) {
        if (this.StatsObject.hasOwnProperty(_Player.id)) {  // If player has a profile
            this.Name = this.StatsObject[_Player.id]["Name"];
            this.Level = this.StatsObject[_Player.id]["Level"];
            this.XP = this.StatsObject[_Player.id]["XP"];
            this.LevelUpXP = this.RequiredLevelUpXP();
            this.Wins = this.StatsObject[_Player.id]["Wins"];
            this.Loss = this.StatsObject[_Player.id]["Loss"];
            for (var i = 0; i < Object.keys(this.StatsObject[_Player.id]["Character Stats"]).length; i++) {
                ClassStats.push(new ClassStats(
                    Object.keys(this.StatsObject[_Player.id]["Character Stats"])[i],
                    this.StatsObject[_Player.id]["Character Stats"][Object.keys(this.StatsObject[_Player.id]["Character Stats"])[i]])
                );
            }
        } else { // If player does not have a profile
            this.Name = _Player;
            this.Level = this.StatsObject["0"]["Level"];
            this.XP = this.StatsObject["0"]["XP"];
            this.LevelUpXP = this.RequiredLevelUpXP();
            this.Wins = this.StatsObject["0"]["Wins"];
            this.Loss = this.StatsObject["0"]["Loss"];
            for (var i = 0; i < Object.keys(this.StatsObject["0"]["Character Stats"]).length; i++) {
                this.ClassStats.push(new ClassStats(
                    Object.keys(this.StatsObject["0"]["Character Stats"])[i],
                    this.StatsObject["0"]["Character Stats"][Object.keys(this.StatsObject["0"]["Character Stats"])[i]])
                );
            }
        }
    }

    CreateEmbed(_Player) {
        this.ReadStats(_Player)
        var StatsEmbed = new Discord.MessageEmbed()
            .setTitle(EMBED_TITLE)
            .addFields(
                { name: 'Player', value: this.Name, inline: true },
                { name: 'Level', value: this.Level, inline: true },
                { name: 'XP', value: `${this.XP}/${this.LevelUpXP}`, inline: true },
                { name: 'Wins', value: this.Wins, inline: true },
                { name: 'Loss', value: this.Loss, inline: true },
                { name: 'W/L', value: this.Wins / this.Loss, inline: true }
            )
            .attachFiles(['./Assets/Images/BattleIcon.png'])
            .setThumbnail('attachment://BattleIcon.png')
            .setFooter('Player Stats');

        for (var i = 0; i < this.ClassStats.length; i++) {
            StatsEmbed.addField(this.ClassStats[i].Name, `Play Count: ${this.ClassStats[i].PlayCount}\nWins: ${this.ClassStats[i].Wins}\nLoss: ${this.ClassStats[i].Loss}\nW/L: ${this.ClassStats[i].Wins / this.ClassStats[i].Loss}`, true);
        }

        return StatsEmbed;
    }

    CreatePlayerEntry(_Player) {

    }
}

function DisplayCharacters(jObject) {
    var Age = 0;
    var Health = 0;
    var Moves = [];
    var Healing = [];
    var DamageBuffs = [];
    var CharacterSelectEmbed = new Discord.MessageEmbed()
        .setTitle(EMBED_TITLE)
        .setDescription('Character Selection')
        .addField('Character', 'Moves\nHealing\nDamage Buffs')
        .attachFiles(['./Assets/Images/BattleIcon.png'])
        .setThumbnail('attachment://BattleIcon.png');

    for (var i = 0; i < Object.keys(jObject).length; i++) { // For every character
        Age = jObject[Object.keys(jObject)[i]]["Age"];
        Health = jObject[Object.keys(jObject)[i]]["Health"];

        for (var move in jObject[Object.keys(jObject)[i]]['Moves']) {
            Moves.push(`${move}: ${jObject[Object.keys(jObject)[i]]['Moves'][move]}\n`); // Add moves to array
        }

        for (var healing in jObject[Object.keys(jObject)[i]]['Abilities']['Healing']) {
            Healing.push(`${healing}: ${jObject[Object.keys(jObject)[i]]['Abilities']['Healing'][healing]}\n`); // Add healing items to array
        }

        for (var damagebuff in jObject[Object.keys(jObject)[i]]['Abilities']['DamageBuffs']) {
            DamageBuffs.push(`${damagebuff}: ${jObject[Object.keys(jObject)[i]]['Abilities']['DamageBuffs'][damagebuff]}x\n`); // Add damage buffs to array
        }

        CharacterSelectEmbed.addField(Object.keys(jObject)[i], // Set field title as character name
            `**Age: **${Age}\n**Health: **${Health}\n\n**Moves**\n${Moves.join('')}\n**Healing Items**\n${Healing.join('')}\n**Damage Buffs**\n${DamageBuffs.join('')}`, // Add stats to field
            true); // Add Stats

        Moves = []; // Reset moves array
        Healing = []; // Reset moves array
        DamageBuffs = []; // Reset moves array
    }

    return CharacterSelectEmbed;
}

async function InBattle_Handler(msg, PlayerName, Player, Enemy) {
    var DoOnceState = true;
    var MoveListView = []

    for (var i = 0; i < Object.keys(Player.Moves).length; i++) {
        MoveListView.push(`${Object.keys(Player.Moves)[i]}: ${Player.Moves[Object.keys(Player.Moves)[i]]}\n`); // Add moves to array
    }
    
    while (inBattle) {
        if (DoOnceState) {
            await msg.channel.send(new Discord.MessageEmbed()
                .setTitle(EMBED_TITLE)
                .setColor('#FFFFFF')
                .addFields(
                    { name: PlayerName, value: `As ${Player.Name}\nHealth: ${Player.Health}`, inline: true },
                    { name: 'AI', value: `As ${Enemy.Name}\nHealth: ${Enemy.Health}`, inline: true },
                    { name: 'Available Moves', value: `**Moves**\n${MoveListView.join('')}` }
                )
                .setFooter('Battle')
            );
            
            DoOnceState = false
        }
    }
}

function EndBattle(msg) {
    msg.channel.send(new Discord.MessageEmbed()
        .setTitle(EMBED_TITLE)
        .setColor('#FFFFFF')
        .addField('Battle Cancelled', 'Noob ran away from the fight eeeeeee')
        .setFooter('Battle')
    );
    inBattle = false;
}

const CHARACTER_IDS = [
    '833121698743451678', // Boris
    '796774405938217030', // Billy
    '833123022164328498', // Camellia
    '800322647720198155'  // NearlyMars
]

module.exports = {
    name: 'BattleMiniGame',
    description: 'Get deleted nerd',
    execute(msg, args) {
        const jObject = JSON.parse(FileSystem.readFileSync('./Assets/Data/Battle/Characters.json'));
        var Enemy = new Character();   // Declare blank Enemy and Player
        var Player = new Character();  // here for global access
        switch (args[1]) {
            case 'start':
                if (!inBattle) {
                    const PLAYER_ID = msg.author.id;
                    const PLAYER_NAME = msg.author.username;
                    Enemy = new Character(jObject, Random.RandInt(0, Object.keys(jObject).length)); // Randomly pick enemy class
                    msg.channel.send(DisplayCharacters(jObject)).then(DefaultEmotesDontWork_LinusWeird => {
                        // Add Reactions
                        for (var i = 0; i < CHARACTER_IDS.length; i++) {
                            DefaultEmotesDontWork_LinusWeird.react(CHARACTER_IDS[i]);
                        }

                        // Setup Filter
                        const filter = (reaction, user) => {
                            return CHARACTER_IDS.includes(reaction.emoji.id) && user.id === PLAYER_ID;
                        }

                        // Await Reactions
                        DefaultEmotesDontWork_LinusWeird.awaitReactions(filter, { max: 1, time: 60000, error: ['time'] })
                            .then(pickedClass => {
                                switch (pickedClass.first().emoji.id) {
                                    case CHARACTER_IDS[0]: // Boris
                                        Player = new Character(jObject, 0);
                                        msg.reply('you picked Boris, enjoy your meal deals! :)');
                                        break;

                                    case CHARACTER_IDS[1]: // Billy
                                        Player = new Character(jObject, 1);
                                        msg.reply('you picked billy, welcome to the posing with waifus club!');
                                        break;

                                    case CHARACTER_IDS[2]: // Camellia
                                        Player = new Character(jObject, 2);
                                        msg.reply('you picked Camellia, with the power of Whats A Genre Remixes, you will be unstoppable!');
                                        break;

                                    case CHARACTER_IDS[3]: // NearlyMars
                                        Player = new Character(jObject, 3);
                                        msg.reply('you picked Battle Mars, a brainless but powerful warrior who for some reason brings a massive vibrator to battle O_o!');
                                        break;
                                }

                                msg.channel.send(new Discord.MessageEmbed()
                                    .setTitle(EMBED_TITLE)
                                    .setColor('#ff2600')
                                    .setDescription('Good Luck!')
                                    .addFields(
                                        { name: PLAYER_NAME, value: `As ${Player.Name}`, inline: true },
                                        { name: 'AI', value: `As ${Enemy.Name}`, inline: true }
                                ));

                                inBattle = true;

                                InBattle_Handler(msg, PLAYER_NAME, Player, Enemy);
                            })
                            .catch(pickedClass => {
                                msg.reply('you didn\'t pick a class within 60 seconds, battle cancelled.');
                                inBattle = false;
                            });
                    });
                } else {
                    msg.reply('A battle is ongoing.');
                }
                break;

            case 'stats':
                if (msg.mentions.members.size) {
                    msg.mentions.members.forEach(user => {
                        msg.channel.send(new PlayerStats().CreateEmbed(user.user));
                    });
                } else {
                    msg.channel.send(new PlayerStats().CreateEmbed(msg.author));
                }
                break;

            case 'cancel':
                EndBattle(msg);
                break;

            case 'stop':
                EndBattle(msg);
                break;
        }

        return true;
    }
}