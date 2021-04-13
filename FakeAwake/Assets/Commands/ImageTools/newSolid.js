const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Utils = require('../../include/utils.js');
const Sharp = require('sharp');
const Vector = require('three');
const Chroma = require('chroma-js');

var color = new Chroma(0, 0, 0, 0);
var resolution = new Vector.Vector2(512, 512);
var isColorSpecified = false,
    isResolutionSpecified = false;

module.exports = {
    name: 'newSolid',
    description: 'Genenrate a Solid',
    execute(msg, args) {
        if (args.length > 2) { // Where any options specified?
            for (var i = 0; i < args.length; i++) { // Check what Flags were specified
                switch (args[i]) {
                    case '-rgb': // Parse -rgb flag
                        var R = parseInt(args[i + 1]) || false,
                            G = parseInt(args[i + 2]) || false,
                            B = parseInt(args[i + 3]) || false;

                        if (!R || !G || !B) { // Are all RGB values valid?
                            msg.channel.send('Invalid RGB');
                        } else {
                            color = new Chroma(R, G, B, 1); // Normalize values and create color
                            isColorSpecified = true;
                        }
                        break;

                    case '-rgba': // Parse -rgba flag
                        var R = parseInt(args[i + 1]) || false,
                            G = parseInt(args[i + 2]) || false,
                            B = parseInt(args[i + 3]) || false,
                            A = parseInt(args[i + 4]) || false;

                        if (!R || !G || !B || !A) { // Are all RGB values valid?
                            msg.channel.send('Invalid RGBA');
                        } else {
                            color = new Chroma(R, G, B, A / 255); // Create color
                            isColorSpecified = true;
                        }
                        break;

                    case '-resolution': //Parse -resolution Command
                        if (args[i + 1].includes('x')) {
                            var W = parseInt(args[i + 1].split('x')[0]) || false,
                                H = parseInt(args[i + 1].split('x')[1]) || false;

                            if (!W || !H) {
                                msg.channel.send('Invalid Resolution');
                            } else {
                                resolution = new Vector.Vector2(W, H);
                                isResolutionSpecified = true
                            }
                        } else {
                            var W = parseInt(args[i + 1]) || false;
                            var H = parseInt(args[i + 2]) || false;

                            if (!W || !H) {
                                msg.channel.send('Invalid Resolution');
                            } else {
                                resolution = new Vector.Vector2(W, H);
                                isResolutionSpecified = true
                            }
                        }
                        break;



                    case '-res': //Parse -res Command
                        if (args[i + 1] && args[i + 1].includes('x')) {
                            var W = parseInt(args[i + 1].split('x')[0]) || false,
                                H = parseInt(args[i + 1].split('x')[1]) || false;

                            if (!W || !H) {
                                msg.channel.send('Invalid Resolution');
                            } else {
                                resolution = new Vector.Vector2(W, H);
                                isResolutionSpecified = true
                            }
                        } else {
                            var W = parseInt(args[i + 1]) || false;
                            var H = parseInt(args[i + 2]) || false;

                            if (!W || !H) {
                                msg.channel.send('Invalid Resolution');
                            } else {
                                resolution = new Vector.Vector2(W, H);
                                isResolutionSpecified = true
                            }
                        }
                        break;
                }
            }

            //Create Image
            if (isColorSpecified && isResolutionSpecified) {
                Sharp({
                    create: {
                        width: resolution.x,
                        height: resolution.y,
                        channels: 4,
                        background: { r: color.get('rgba.r'), g: color.get('rgba.g'), b: color.get('rgba.b'), alpha: color.get('rgba.a') }
                    }
                }).toFile('./Assets/temp/Solid.png').then(image => {
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('Successfully created new Solid')
                        .setColor(Status.StatusColor('OK'))
                        .addFields(
                            { name: 'Color', value: `R: ${Math.round(color.get('rgba.r'))}, G: ${Math.round(color.get('rgba.g'))}, B: ${Math.round(color.get('rgba.b'))}, A: ${Math.round(color.get('rgba.a') * 100) / 100}` },
                            { name: 'Resolution', value: `Width: ${resolution.x}, Width: ${resolution.y} ` }
                        )
                        .attachFiles(['./Assets/Images/MissingTexture.png'])
                        .setThumbnail('attachment://MissingTexture.png')
                        .setFooter('Image Tools')
                    );
                    msg.channel.send(new Discord.MessageAttachment('./Assets/temp/Solid.png'));
                });
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Help > Image Tools > New Solid')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: '.it newsolid -rgb {r} {g} {b} -resolution {widthxheight || width height}', value: 'Genenrate a Solid' }
                )
                .attachFiles(['./Assets/Images/MissingTexture.png'])
                .setThumbnail('attachment://MissingTexture.png')
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        /* Reset */
        isColorSpecified = false;
        isResolutionSpecified = false;

        return true;
    }
}