const Discord = require('discord.js');
const Status = require('../../include/status.js');
const FileSystem = require('fs');
//const ChangeLog = require('../../../ChangeLog.json');

//var JObject = JSON.parse(FileSystem.readFileSync('../../../ChangeLog.json', 'utf8'));

module.exports = {
    name: 'changelog',
    description: 'Returns changelog',
    execute(msg, args) {
        //msg.channel.send(JObject);

        return true;
    }
}