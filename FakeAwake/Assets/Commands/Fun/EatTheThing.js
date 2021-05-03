const Discord = require('discord.js');
const emoteRenderer = require('../../include/emoteGraphicsEngine.js');

var Viewport = new emoteRenderer(9, 9);

module.exports = {
    name: 'EatTheThing',
    description: 'empty',
    execute(msg, args, client) {
        Viewport.background = client.emojis.cache.find(emote => emote.name === 'AYAYA');
        Viewport.DrawRectangle(0, 0, 8, 8, client.emojis.cache.find(emote => emote.name === 'LSDCube'), false);
        Viewport.DrawRectangle(2, 2, 4, 4, client.emojis.cache.find(emote => emote.name === 'LSDCube'), false);
        // Viewport.DrawCircle(4, 4, 3);
        msg.channel.send(Viewport.Render());

        return true;
    }
}