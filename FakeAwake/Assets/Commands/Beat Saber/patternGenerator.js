const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Sharp = require('sharp');
const FileSystem = require('fs');
const Random = require('../../include/random.js');

const BloqDir = './Assets/Images/BeatSaberBlocks';
const Bloq = FileSystem.readdirSync(BloqDir).splice(1, FileSystem.readdirSync(BloqDir).length - 1);
const RedBloq = FileSystem.readdirSync(BloqDir).filter(__filename => __filename.includes('red'));

module.exports = {
    name: 'bsPatternGenerator',
    description: 'Cursed patterns are good patterns.',
    execute(msg, args) {
        var Lanes = 4,
            Rows = 3,
            Fill = 40;

        for (let i = 0; i < args.length; i++) {
            switch (args[i]) {
                case '-r':
                case '-row':
                case '-rows':
                    Rows = parseInt(args[i + 1]) || 3;
                    break;

                case '-l':
                case '-lane':
                case '-lanes':
                    Lanes = parseInt(args[i + 1]) || 4;
                    break;

                case '-f':
                case '-fill':
                    Fill = parseInt(args[i + 1]) || 40;
                    break;
            }
        }

        var Canvas = Sharp({
            create: {
                width: Lanes * 128,
                height: Rows * 128,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        });

        var Composition = [];

        for (var i = 0; i < Rows; i++) {
            for (var j = 0; j < Lanes; j++) {
                if (Random.RandInt(0, 100) > Fill) {
                    Composition.push(
                        {
                            input: `${BloqDir}/blank.png`,
                            top: 128 * i,
                            left: 128 * j
                        }
                    );
                } else {
                    Composition.push(
                        {
                            input: `${BloqDir}/${Bloq[Random.RandInt(0, Bloq.length)]}`,
                            top: 128 * i,
                            left: 128 * j
                        }
                    );
                }
            }
        };

        Canvas.composite(Composition).toFile('./Assets/temp/pattern.png').then(() => {
            msg.channel.send(new Discord.MessageAttachment('Assets/temp/pattern.png'));
        });

        return true;
    }
}