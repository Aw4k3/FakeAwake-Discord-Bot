const Discord = require('discord.js');
const Status = require('../../include/status.js');

module.exports = {
    name: 'leds',
    description: 'Rainbow = PrideKappa',
    execute(msg, args, serialPort) {
        /*
        if (args.length === 4) {
            var RGB = [parseInt(args[1]), parseInt(args[2]), parseInt(args[3])];
            serialPort.write(Buffer.from(RGB));
        }

        if (args.length === 2) {
            switch (args[1]) {
                case 'rainbow':
                    serialPort.write(Buffer.from(['0']));
                    break;
            }
        }
        */

        if (args.length > 4) {
            /* Formatting [.leds, effect, {r}, {g}, {b}]  */
            switch (args[1]) {
                case 'rgb':
                    if (args[2] && args[3] && args[4]) {
                        serialPort.write(Buffer.from('0', [args[2], args[3], args[4]]));
                    }
                    break;
                case 'rainbow':
                    serialPort.write(Buffer.from('1', '0', '0', '0'));
                    break;
            }
        } else {
            msg.reply('fail');
        }
    }
}