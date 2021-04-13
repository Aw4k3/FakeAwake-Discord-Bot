const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Random = require('../../include/random');

const responses = [
    "As I see it, yes.",
    "It is certain.",
    "Most likely.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Outlook good.",
    "Signs point to yes.",
    "Very doubtful.",
    "Without a doubt.",
    "Yes.",
    "Yes – definitely.",
    "AAAAAAAAAAAAAAAAA",
    "mmmmmmmm",
    "No",
    "I don't even know man",
    "Brain fried more than a family size bucket of extra crispy chicken",
	"did the chicken cross the road?",
    "Perhamps",
    "Why are you asking this",
    "Ask someone else and leave me alone",
    "As certain as me banging your mom",
	"Let me drink some choccy milk and think about it",
	"You already know the answer",
	"At least think for a moment",
	"The average chair has less than 4 legs",
	":KEKW:",
	"You gotta ask 10 questions to get a 5 star response",
	"Why?",
	"Fuck off",
	"Admit your wrongdoings",
	"Repent for your sins",
	"As likely as you being born"
];

module.exports = {
    name: '8ball',
    description: 'Do you have 8 balls kind sir?',
    execute(msg, args) {
        if (args.length > 1) {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('8Ball')
                .setColor(Status.StatusColor('OK'))
                .attachFiles(['./Assets/Images/MissingTexture.png'])
                .setThumbnail('attachment://MissingTexture.png')
                .addField('8Ball says', responses[Random.RandInt(0, responses.length)])
                .setFooter('8Ball')
            );
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: '8ball {Question or Statment}', value: 'Ask 8ball anything' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}