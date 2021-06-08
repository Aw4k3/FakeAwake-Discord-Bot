const Discord = require('discord.js');
const Vibrant = require('node-vibrant');
const Website = require('../../include/webclient');
const Sharp = require('sharp');
const Status = require('../../include/status.js');
const Utils = require('../../include/utils.js');
const FileSystem = require('fs');
const { del } = require('request');

const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

async function getProfileColor(msg) {
    await Website.DownloadFile(msg.author.avatarURL(), './Assets/temp/meProfileImage.webp');
    await Sharp('./Assets/temp/meProfileImage.webp').toFile('./Assets/temp/meProfileImage.png');
    return new Vibrant.from('./Assets/temp/meProfileImage.png')
}

function buildFieldData(args, idx, spoiler = true) {
    var FieldData = '';
    for (var i = idx + 1; i < args.length; i++) {
        if (!args[i].includes('--')) {
            FieldData += args[i] + ' ';
        } else {
            break;
        }
    }

    if (spoiler) {
        return `||${FieldData.trim()}||`;
    } else {
        return FieldData.trim();
    }
}

module.exports = {
    name: 'oculus',
    description: 'Oculus man',
    execute(msg, args) {

        msg.channel.send(new Discord.MessageAttachment('Assets/Gifs/oculustrash.gif'));

        return true;
    }
}