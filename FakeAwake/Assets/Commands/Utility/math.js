const Discord = require('discord.js');
const Status = require('../../include/status.js');

module.exports = {
    name: 'math',
    description: '9 + 10 = 21',
    execute(msg, args) {
        
        var result = 0,
            nextTerm = 0;

        var temp = Number(args[1]) || false
        if (!temp) { result = 0; } else { result = temp; } // Becuse the parser doesn't like the number 0

        for (var i = 2; i < args.length; i++) {
            nextTerm = parseFloat(args[i]) || false;
            if (nextTerm !== false) {
                switch (args[i - 1]) {
                    case '+':
                        result += nextTerm;
                        break;

                    case '-':
                        result -= nextTerm;
                        break;

                    case '*':
                        result = result * nextTerm;
                        break;

                    case '/':
                        result = result / nextTerm;
                        break;

                    case '^':
                        result = Math.pow(result, nextTerm);
                        break;
                }
            }
        }

        msg.channel.send(new Discord.MessageEmbed()
            .setTitle('Calculator')
            .setColor(Status.StatusColor('OK'))
            .setDescription(msg.content.replace('.math ', ''))
            .addField('Result', result)
            .attachFiles(['./Assets/Images/CalculatorIcon.png'])
            .setThumbnail('attachment://CalculatorIcon.png')
            .setFooter('Munbers')
        );

        return true;
    }
}