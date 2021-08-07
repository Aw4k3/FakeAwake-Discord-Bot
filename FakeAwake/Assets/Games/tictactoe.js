const Discord = require('discord.js');
const emoteGE = require('../include/DiscordGameEngine/emoteGraphicsEngine.js');
const controls = require('../include/DiscordGameEngine/controls');;

var Viewport
var Controls = new controls();
var Msg = new Discord.Message();

var player1 = -1,
    player2 = -1;

function Initialize(PLAYER1_ID, PLAYER2_ID, client, msg) {
    player1 = PLAYER1_ID;
    player2 = PLAYER2_ID;
    Viewport = new emoteGE.Viewport(client, 3, 3);
    Msg = msg
}

function Run() {
    Msg.channel.send(Viewport.Render());
}

module.exports = {
    Initialize,
    Run
}