const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Sharp = require('sharp');
const FileSystem = require('fs');
const Random = require('../../include/random.js');
// const GetAudioDuration = require('get-audio-duration');
const WebClient = require('../../include/webclient.js');

/* 
 * This is going to be an absolute mess
 * Letting FakeAwake make maps monka
 * PepeChrist
 */

const ValidAudioFiles = [
    'mp3',
    'wav',
    'flac'
]

module.exports = {
    name: 'bsMapGenerator',
    description: 'Cursed mapping is best mapping.',
    execute(msg, args) {
        var Duration = 0,
            BPM = 0,
            Beat = 4,
            BeatDuration = 0,
            ValidAudioFile = false;

        if (msg.attachments.size > 0 && args.lenth > 2) {
            var fileExtension = msg.attachments.first().name.split('.')[1];
            for (var i = 0; i < args.length; i++) {
                switch (args[i]) {
                    case '-bpm':
                        BPM = parseInt(args[i + 1]) || 0;
                        break;
                }
            }
            // if (ValidAudioFiles.includes(fileExtension)) {
            // 
            // }

            WebClient.DownloadFile(msg.attachments.first().url, `./Assets/temp/song.${fileExtension}`, function () {
                if (fileExtension === 'ogg' && BPM > 0) {
                    //GetAudioDuration('./Assets/temp/song.ogg').then(duration => Duration = duration); // Get Length of Song
                    BeatDuration = 60 / BPM;
                    while (Beat++ * BeatDuration < Duration) {
                        for (var i = 0; i < 4; i++) { // For each Lane
                            for (var j = 0; j < 3; j++) { // For each Row
                                if (Random.RandInt(0, 100) > 10) {
                                    var x = 0;
                                }
                            }
                        };
                    }
                }
            });

            
        }

        return true;
    }
}