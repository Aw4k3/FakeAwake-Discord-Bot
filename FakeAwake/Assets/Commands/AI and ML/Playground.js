const Brain = require('brain.js');
const Utils = require('../../include/utils.js');
const FileSystem = require('fs');

const NeuralNetwork = new Brain.recurrent.LSTM();
const RETRAIN_AI = false;

if (RETRAIN_AI) {
    const TRAINING_SET = require('../../Data/AI and ML/Playground.json').map(item => ({
        input: item.message,
        output: item.isStroke
    }));

    NeuralNetwork.train(TRAINING_SET, {
        iterations: 1000,
        log: details => console.log(`${Utils.getTimeStamp()}[AI: Training] ${details}`)
    });

    FileSystem.writeFileSync('./Assets/Data/AI and ML/PlaygroundTrained.json', JSON.stringify(NeuralNetwork.toJSON(), null, 2));
} else {
    NeuralNetwork.fromJSON(JSON.parse(FileSystem.readFileSync('./Assets/Data/AI and ML/PlaygroundTrained.json')));
}

module.exports = {
    name: 'testAI',
    description: 'AI and ML playground',
    execute(msg, args) {
        var AI_input = ''

        for (var i = 1; i < args.length; i++) {
            AI_input += args[i] + ' ';
        }

        const AI_RESULT = NeuralNetwork.run(AI_input.trim());
        if (!(parseFloat(AI_RESULT) || false)) {
            msg.channel.send('No stroke');
        } else {
            msg.channel.send('Yes stroke');
        }

        return true;
    }
}