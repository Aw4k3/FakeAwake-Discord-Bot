const Discord = require('discord.js');
const emoteGE = require('../../include/DiscordGameEngine/emoteGraphicsEngine.js');
const navArea = require('../../include/DiscordGameEngine/navArea.js');
const controls = require('../../include/DiscordGameEngine/controls.js');
const character = require('../../include/DiscordGameEngine/character.js');

const BOT_ID = '707698652076048406'

var Viewport;
var Controls;

function inputHandler(game, reaction, user) {
    switch (reaction._emoji.name) {
        case '⬅':
            if (reaction.message.id === game.id && user.id !== BOT_ID) {
                Controls.bindings[0].Execute();
            }
            break;

        case '➡':
            if (reaction.message.id === game.id && user.id !== BOT_ID) {
                Controls.bindings[1].Execute();
            }
            break;

        case '⬆':
            if (reaction.message.id === game.id && user.id !== BOT_ID) {
                Controls.bindings[2].Execute();
            }
            break;

        case '⬇':
            if (reaction.message.id === game.id && user.id !== BOT_ID) {
                Controls.bindings[3].Execute();
            }
            break;
    }

    game.edit(Viewport.Render());
}

module.exports = {
    name: 'EatTheThing',
    description: 'empty',
    execute(msg, args, client) {
        Viewport = new emoteGE.Viewport(client, 11, 11);
        Controls = new controls();

        var Player = new character.Actor(client.emojis.cache.find(emote => emote.id === '771456717451821060'), 4, 4, Viewport);

        // Setup up Background
        Viewport.background = ':purple_square:';
        Viewport.gameObjects.push(new emoteGE.Rectangle(0, 0, 11, 11, Viewport));
        Viewport.gameObjects[0].Render(':red_square:', false);
        Viewport.gameObjects.push(Player);
        Viewport.gameObjects[1].Render();

        // Setup up Nav Area
        var Playspace = new navArea(1, 1, Viewport.width - 2, Viewport.height - 2);
        // Playspace.showNavArea(Viewport);

        // Setup Controls
        
        Controls.addControls('⬅', function () {
            if (Player.Position.x - 1 >= Playspace.Left) {
                Player.Position.x--;
                Player.Render();
            }
        });

        Controls.addControls('➡', function () {
            if (Player.Position.x + 1 <= Playspace.Right) {
                Player.Position.x++;
                Player.Render();
            }
        });

        Controls.addControls('⬆', function () {
            if (Player.Position.y - 1 >= Playspace.Top) {
                Player.Position.y--;
                Player.Render();
            }
        });

        Controls.addControls('⬇', function () {
            if (Player.Position.y + 1 <= Playspace.Bottom) {
                Player.Position.y++;
                Player.Render();
            }
        });
        
        msg.channel.send(Viewport.Render()).then(game => {
            Controls.addControlsToMessage(game);

            client.on('messageReactionAdd', (reaction, user) => {
                inputHandler(game, reaction, user);
            });

            client.on('messageReactionRemove', (reaction, user) => {
                inputHandler(game, reaction, user);
            });
        });
        return true;
    }
}