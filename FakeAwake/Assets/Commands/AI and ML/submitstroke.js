const FileSystem = require('fs');

module.exports = {
    name: 'submitstroke',
    description: 'Submit Stroke and Log it',
    execute(msg, args) {
        var stroke = ''

        for (var i = 1; i < args.length; i++) {
            stroke += args[i] + ' ';
        }

        var JObject = JSON.parse(FileSystem.readFileSync('./Assets/Data/AI and ML/Playground.json'));
        JObject.push({
            "message": stroke.trim(),
            "isStroke": 1
        });
        
        FileSystem.writeFileSync('./Assets/Data/AI and ML/Playground.json', JSON.stringify(JObject, null, 2));
        msg.reply('tHAKN fOR smUBBtION')

        return true;
    }
}