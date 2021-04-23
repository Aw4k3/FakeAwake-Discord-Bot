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
    "As likely as you being born",
    "*notices your bulge*\nsorry what did you say?",
    "*purrs*",
    "*eyes pop out*\nNow that's a good question!\n*pants heavily*\nLet me give that a thinker\n*unzips pants and shits on floor*",
    "Definitely a no... unless :smirk:",
    ":handshake:",
    "Please phrase it as a yes or no question",
    "Put on the cat ears and I might answer",
    "Let me slam my head against the wall first",
    "Buy me more ram. I don't have enough to handle your stupid",
    "Just as likely as me doing your mom",
    "Just as likely as me doing your mum",
    "uhu",
    "I am a potato",
    "Are you ready, kids?\nAye, aye, Captain!\nI can't hear you!\nAye, aye, captain!\nOh!\n\nWho lives in a pineapple under the sea?\nSpongeBob SquarePants!\nAbsorbent and yellow and porous is he\nSpongeBob SquarePants!\nIf nautical nonsense be something you wish\nSpongeBob SquarePants!\nThen drop on the deck and flop like a fish!\nSpongeBob SquarePants!\n\nSpongeBob SquarePants!\nSpongeBob SquarePants!\nSpongeBob SquarePants!\nSpongeBob SquarePants!\n\nAh-hah\nHahaha\nAh-hah, hahahar",
    "All toasters toast toast",
    "Sometimes violence is the answer",
    "You must sacrifice me 2 goats for a satisfactory answer",
    "rawr\nrawr\nrawr",
    "peepee and poopoo makes the world go UwU",
    "You asked at the wrong time friend\n*cocks gun*",
    "Yeehaw\n*cracks whip*\nThat sure 'ell is the case my friend!",
    "8am",
    "4:20pm",
    "Snails establish dominance in a relationship by fencing with their penises. The loser gets penetrated and becomes female",
    "Nayhay I dare say",
    "*sips tea*\n,no\n*sips tea again*",
    ".help",
    "this is a premium feature. Pay £4.99 to unlock",
    "The answer is catgirls. Don't think about it",
    "I'm taking a nap go away",
    "Bandoot sabers",
    "Camera+",
    "Ask another bot, I'm off duty",
    "AND IT'S A STRIIIIIIIKE",
    "Mayhaps there is a chance",
    "There's gonna be a 1% chance of it happening",
    "if it rains tomorrow, it's a yes",
    "Currently taking a shit, sorry",
    "I don't answer to non e-girls",
    "you're a little shit for asking that, but it's a yes",
    "stop horny posting",
    "jesus christ I said stop horny posting",
    ":thinking:",
    "ask google",
    "Think about it yourself",
    "Generic answer. No",
    "you made that up, it can't be real",
    "Get off discord and touch some grass",
    "*tickles your feet*\ntee hee you like that don't you?\nThe answer is still no",
    "Thighs are superior. I don't care if it's relevant, but it's a fact",
    "mindblocked atm",
    "Yeppers",
    "*nods in self-satisfaction*",
    "Bababooey",
    "Preposterous. How dare you ask that",
    "as likely as you getting a girlfriend",
    "ape smart. ape say yes",
    "For Honor was a good game. You can read my explanation as to why in this 20 page document",
    "Screaming avocados are as terrifying as the answer to your question",
    "Let me check what the predictions say!\n*pulls paper out of pocket*\nYou're in luck! It's a no!",
    "Let me check what the predictions say!\n*pulls paper out of pocket*\nYou're in luck! It's a yes!",
    "Let me check what the predictions say!\n*pulls paper out of pocket*\nYou're in luck! It's a gun!\nGive me your money!",
    "FakeyWakey-chan will now respond to your question tee-hee.\nwinks It's the usual yes! Good for you onii-chan!",
    "There was a 1% chance of you getting this answer, how lucky. You win absolutely nothing, not even an answer"
];

module.exports = {
    name: '8ball',
    description: 'Do you have 8 balls kind sir?',
    execute(msg, args) {
        if (args.length > 1) {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('8Ball')
                .setColor(Status.StatusColor('OK'))
                .attachFiles(['./Assets/Images/8BallIcon.png'])
                .setThumbnail('attachment://8BallIcon.png')
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