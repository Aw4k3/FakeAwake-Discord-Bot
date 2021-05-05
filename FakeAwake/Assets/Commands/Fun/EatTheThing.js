const Discord = require('discord.js');
const emoteGE = require('../../include/DiscordGameEngine/emoteGraphicsEngine.js');
const navArea = require('../../include/DiscordGameEngine/navArea.js');
const controls = require('../../include/DiscordGameEngine/controls.js');

var Viewport;
var Controls;

function inputHandler(game, reaction, user) {
    switch (reaction._emoji.name) {
        case '⬅':
            if (reaction.message.id === game.id && user.id !== '707698652076048406') {
                Controls.bindings[0].Execute();
                game.edit(Viewport.Render());
            }
            break;

        case '➡':
            if (reaction.message.id === game.id && user.id !== '707698652076048406') {
                Controls.bindings[1].Execute();
                game.edit(Viewport.Render());
            }
            break;

        case '⬆':
            if (reaction.message.id === game.id && user.id !== '707698652076048406') {
                Controls.bindings[2].Execute();
                game.edit(Viewport.Render());
            }
            break;

        case '⬇':
            if (reaction.message.id === game.id && user.id !== '707698652076048406') {
                Controls.bindings[3].Execute();
                game.edit(Viewport.Render());
            }
            break;
    }
}

module.exports = {
    name: 'EatTheThing',
    description: 'empty',
    execute(msg, args, client) {
        Viewport = new emoteGE(client, 9, 6);
        Controls = new controls();

        // Setup up Background
        Viewport.background = ':green_square:';
        Viewport.DrawRectangle(0, 0, 9, 6, ':negative_squared_cross_mark:', false);
        Viewport.CreateSprite('800322647720198155', 4, 2);

        // Setup up Nav Area
        var Playspace = new navArea(1, 1, Viewport.width - 2, Viewport.height - 2);
        // Playspace.showNavArea(Viewport);

        // Setup Controls
        Controls.addControls('⬅', function () {
            if (Viewport.sprites[0].x - 1 >= Playspace.Left) {
                Viewport.sprites[0].x--;
            }
        });

        Controls.addControls('➡', function () {
            if (Viewport.sprites[0].x + 1 <= Playspace.Right) {
                Viewport.sprites[0].x++;
            }
        });

        Controls.addControls('⬆', function () {
            if (Viewport.sprites[0].y - 1 >= Playspace.Top) {
                Viewport.sprites[0].y--;
            }
        });

        Controls.addControls('⬇', function () {
            if (Viewport.sprites[0].y + 1 <= Playspace.Bottom) {
                Viewport.sprites[0].y++;
            }
        });

        msg.channel.send(Viewport.Render()).then(game => {
            Controls.addControlsToMessage(game);

            var controlFilter = [];

            for (var i = 0; i < Controls.bindings.length; i++) {
                controlFilter.push(Controls.bindings[i].id)
            }

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