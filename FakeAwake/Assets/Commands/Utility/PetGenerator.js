const Discord = require('discord.js');
const FileSystem = require('fs');
//const petPetGif = require('pet-pet-gif');
const Status = require('../../include/status.js');

module.exports = {
    name: 'petGenerator',
    description: 'petGenerator',
    execute(msg, args) {
        /*
        if (msg.mentions.users.size) {
            msg.mentions.users.forEach(user => {
                var petGif = petPetGif(user.avatarURL);

                FileSystem.writeFile('./Assets/temp/petpet.gif', petGif, function (err) {
                    console.log(`${Utils.getTimeStamp()}${err}`)
                });

                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('PetPet')
                    .setColor(Status.StatusColor('OK'))
                    .attachFiles(['./Assets/temp/petpet.gif'])
                    .setImage('attachment://petpet.gif')
                    .setFooter('Pet :)')
                );
            });
        } else {
            msg.channel.send('awake is a lazy and didnt code this part yet');
        }
        */
        return true;
    }
}