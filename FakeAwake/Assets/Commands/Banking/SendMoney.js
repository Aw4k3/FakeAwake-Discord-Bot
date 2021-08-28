const Discord = require('discord.js');
const FileSystem = require('fs');
const Status = require('../../include/status.js');
const Banking = require('./Banking.js');

module.exports = {
    name: 'bankSendMoney',
    description: 'Send money to someone',
    execute(msg, args) {
        

        return true;
    }
}