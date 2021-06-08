const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Utils = require('../../include/utils.js');
const Sharp = require('sharp');
const Vector = require('three');
const Chroma = require('chroma-js');
const WebClient = require('../../include/webclient.js');
const FileSystem = require('fs');

const ColorSpaces = ['srgb', 'rgb', 'cymk', 'lab', 'bw'];
var editLogEmbed = new Discord.MessageEmbed()
    .setTitle('Successfully edited image')
    .setColor(Status.StatusColor('OK'))
    .attachFiles(['./Assets/Images/MissingTexture.png'])
    .setThumbnail('attachment://MissingTexture.png')
    .setFooter('Image Tools');

/*************** Functions ***************/
async function getImageFromAttachment(msg, fileExtension) {
    await WebClient.DownloadFile(msg.attachments.first().url, `./Assets/temp/uneditedImage.${fileExtension}`);
}

/*************** Main ***************/
module.exports = {
    name: 'edit',
    description: 'Apply slight tweaks to a provided image',
    execute(msg, args) {
        if (args.length > 2 && msg.attachments) { // Where any options specified along with an attached image?

        /* Download Image */
            var fileExtension = msg.attachments.first().name.split('.')[1];

            /* Efficiency is overrated
             * Thank you javascript being a peice of shit and being non blocking
             * so I have to make a seperate async function to await this download.
             * 
             * P A I N
             * 
             * WebClient.DownloadFile(msg.attachments.first().url, `./Assets/temp/uneditedImage.${fileExtension}`);
             */
            //getImageFromAttachment(msg, fileExtension); //Download Image
            var StartTime = Date.now();
            WebClient.DownloadFile(msg.attachments.first().url, `./Assets/temp/uneditedImage.${fileExtension}`, function () {
                var imageObject = Sharp(`./Assets/temp/uneditedImage.${fileExtension}`)
                for (var i = 0; i < args.length; i++) { // Check what Flags were specified
                    var Success = true;
                    switch (args[i]) {
                        case '-resize':
                            var newResolution = Vector.Vector2(64, 64);

                            /* Parse resolution */
                            if (args[i + 1].includes('x')) {
                                var W = parseInt(args[i + 1].split('x')[0]) || false;
                                var H = parseInt(args[i + 1].split('x')[1]) || false;

                                if (!W || !H) {
                                    msg.channel.send('Invalid Resolution');
                                    Success = false;
                                } else {
                                    newResolution = new Vector.Vector2(W, H);
                                }
                            } else {
                                var W = parseInt(args[i + 1]) || false;
                                var H = parseInt(args[i + 2]) || false;

                                if (!W || !H) {
                                    msg.channel.send('Invalid Resolution');
                                    Success = false;
                                } else {
                                    newResolution = new Vector.Vector2(W, H);
                                }
                            }

                            /* Resize Image */
                            imageObject.resize({
                                width: newResolution.x,
                                height: newResolution.y,
                                fit: Sharp.fit.fill
                            });

                            /* Log changes */
                            console.log(`${Utils.getTimeStamp()}[ImageTools] Resized image at "./Assets/temp/uneditedImage.${fileExtension}" to ${newResolution.x} x ${newResolution.y}`)
                            editLogEmbed.addField('Resize', `${newResolution.x} x ${newResolution.y}`);
                            break;

                    /* Color Manipulation */
                        case '-brightness':
                            var brightness = parseFloat(args[i + 1]) || false;
                            if (!brightness) {
                                msg.channel.send('Invalid brightness');
                                Success = false;
                            } else {
                                imageObject.modulate({ brightness: brightness });
                                console.log(`${Utils.getTimeStamp()}[ImageTools] Set brightness of image at "./Assets/temp/uneditedImage.${fileExtension}" to ${brightness}`);
                                editLogEmbed.addField('Brightness', `${brightness}`);
                            }
                            break;

                        case '-colorspace':
                            var newColorspace = args[i + 1];
                            var validColorspace = false;

                            for (var i = 0; i < ColorSpaces.length; i++) {
                                if (newColorspace === ColorSpaces[i]) {
                                    validColorspace = true;
                                }
                            }

                            if (validColorspace) {
                                if (newColorspace === 'bw') {
                                    imageObject.toColorspace('b-w');
                                    console.log(`${Utils.getTimeStamp()}[ImageTools] Converted image at "./Assets/temp/uneditedImage.${fileExtension}" to bw}`)
                                    editLogEmbed.addField('Colorspace', 'Black and White');
                                } else {
                                    imageObject.toColorspace(newColorspace);
                                    console.log(`${Utils.getTimeStamp()}[ImageTools] Converted image at "./Assets/temp/uneditedImage.${fileExtension}" to the ${newColorspace} colorspace`)
                                    editLogEmbed.addField('Colorspace', newColorspace);
                                }
                            } else {
                                msg.channel.send('Invalid or Unsupported Color Space');
                                Success = false;
                            }
                            break;

                        case '-grayscale':
                            imageObject.greyscale();
                            console.log(`${Utils.getTimeStamp()}[ImageTools] Converted image at "./Assets/temp/uneditedImage.${fileExtension}" to grayscale`);
                            editLogEmbed.addField('Grayscale', 'True');
                            break;

                        case '-hueshift':
                        case '-huerotate':
                        case '-hue':
                            var rotate = parseFloat(args[i + 1]) || false;
                            if (!rotate) {
                                msg.channel.send('Invalid hue rotation');
                                Success = false;
                            } else {
                                imageObject.modulate({ hue: rotate });
                                console.log(`${Utils.getTimeStamp()}[ImageTools] Hue rotated image at "./Assets/temp/uneditedImage.${fileExtension}" by ${rotate} degrees`);
                                editLogEmbed.addField('Hue Shifted', `${rotate} degrees`);
                            }
                            break;

                        case '-saturation':
                        case '-sat':
                            var saturation = parseFloat(args[i + 1]) || false;
                            if (!saturation) {
                                msg.channel.send('Invalid saturation');
                                Success = false;
                            } else {
                                imageObject.modulate({ saturation: saturation });
                                console.log(`${Utils.getTimeStamp()}[ImageTools] Set saturation of image at "./Assets/temp/uneditedImage.${fileExtension}" to ${saturation}`);
                                editLogEmbed.addField('Saturation', `${saturation}`);
                            }
                            break;

                        case '-tint': // Incomplete
                            var tintColor = new Chroma(0, 0, 0, 0),
                                isColorSpecified = false,
                                R = parseInt(args[i + 1]) || false,
                                G = parseInt(args[i + 2]) || false,
                                B = parseInt(args[i + 3]) || false;

                            if (!R || !G || !B) { // Are all RGB values valid?
                                msg.channel.send('Invalid RGB');
                                Success = false;
                            } else {
                                tintColor = new Chroma(R, G, B); // Create color
                                isColorSpecified = true;
                            }

                            if (isColorSpecified) {
                                imageObject.tint(tintColor.get('rgb'));
                                editLogEmbed.addField('Tint', `R: ${Math.round(tintColor.get('rgba.r'))}, G: ${Math.round(tintColor.get('rgba.g'))}, B: ${Math.round(tintColor.get('rgba.b'))}, A: ${Math.round(tintColor.get('rgba.a') * 100) / 100}` );
                            }
                            break;

                    /* Image Operations */
                        case '-blur':
                            if (args[i + 1]) {
                                var radius = parseFloat(args[i + 1]) || false;

                                if (!radius) {
                                    msg.channel.send('Invalid blur radius')
                                    Success = false;
                                } else {
                                    imageObject.blur(radius);
                                    console.log(`${Utils.getTimeStamp()}[ImageTools] Blurred image at "./Assets/temp/uneditedImage.${fileExtension}" with blur radius of ${radius}`);
                                    editLogEmbed.addField('Blur', `Radius: ${radius}`);
                                }
                            }
                            break;

                        case '-flip':
                            imageObject.flip();
                            console.log(`${Utils.getTimeStamp()}[ImageTools] Flipped image at "./Assets/temp/uneditedImage.${fileExtension}"`);
                            editLogEmbed.addField('Flipped', 'True');
                            break;

                        case '-flop':
                            imageObject.flop();
                            console.log(`${Utils.getTimeStamp()}[ImageTools] Flopped image at "./Assets/temp/uneditedImage.${fileExtension}"`);
                            editLogEmbed.addField('Flopped', 'True');
                            break;

                        case '-rotate':
                            if (args[i + 1]) {
                                var rotation = parseInt(args[i + 1]) || false;

                                if (!rotation) {
                                    msg.channel.send('Invalid rotation')
                                    Success = false;
                                } else {
                                    imageObject.rotate(rotation, { background: new Chroma(0, 0, 0, 0).rgba() });
                                    console.log(`${Utils.getTimeStamp()}[ImageTools] Rotated  image at "./Assets/temp/uneditedImage.${fileExtension}" with rotation of ${rotation} deg`);
                                    editLogEmbed.addField('Rotation', `${rotation} deg`);
                                }
                            }
                            break;

                        case '-sharpen':
                        case '-sharpness':
                            var radius = parseFloat(args[i + 1]) || false;

                            if (!radius) {
                                imageObject.sharpen();
                                console.log(`${Utils.getTimeStamp()}[ImageTools] Sharpened image at "./Assets/temp/uneditedImage.${fileExtension}"`);
                                editLogEmbed.addField('Sharpened', 'True');
                            } else {
                                imageObject.sharpen(radius);
                                console.log(`${Utils.getTimeStamp()}[ImageTools] Sharpened image at "./Assets/temp/uneditedImage.${fileExtension}" by ${radius}`);
                                editLogEmbed.addField('Sharpened', `Radius: ${radius}`);
                            }
                            break;

                        case '-threshold':
                            var limit = parseFloat(args[i + 1]) || false;
                            if (!limit) {
                                msg.channel.send('Invalid threshold limit');
                                Success = false;
                            } else {
                                imageObject.threshold(limit);
                            }
                            break;
                    }
                }

                if (Success) {
                    //Save Image
                    imageObject.toFile('./Assets/temp/editedImage.png').then(Sendit => {
                        var fileSize = FileSystem.statSync('./Assets/temp/editedImage.png').size;
                        editLogEmbed.addField('Processing Time', `${Date.now() - StartTime}ms`);
                        editLogEmbed.addField('Filesize', `${Math.round(fileSize * 100 / 1024 / 1024) / 100}MB`);
                        if (fileSize > 8 * 1024 * 1024) {
                            msg.channel.send(editLogEmbed
                                .addField('Result file size too large', `Discord file size limit is 8MB, File was ${Math.round(fileSize * 100 / 1024 / 1024) / 100}MB`)
                                .setColor(Status.StatusColor('ERROR'))
                            );
                            editLogEmbed.fields = [];
                        } else {
                            //Send Image
                            msg.channel.send(editLogEmbed);
                            msg.channel.send(new Discord.MessageAttachment('./Assets/temp/editedImage.png'));
                            editLogEmbed.fields = [];
                        }
                    });
                }
            });
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Help > Image Tools > Edit')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: '.it edit [flag] [flag] [flag]...', value: 'Apply slight tweaks to a provided image' },
                    { name: 'Generic Flags', value: '-resize'},
                    { name: 'Color Manipulation Flags', value: '-colorspace | -grayscale | -tint' },
                    { name: 'Image Operation Flags', value: '-blur | -flip | -flop | -rotate | -sharpen' },
                    { name: 'Available Colorspaces', value: 'srgb | rgb | cymk | lab | bw' }
                )
                .attachFiles(['./Assets/Images/MissingTexture.png'])
                .setThumbnail('attachment://MissingTexture.png')
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}