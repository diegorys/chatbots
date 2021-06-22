'use strict';

const TelegramBot = require('node-telegram-bot-api')
const { NlpManager } = require('node-nlp');
const secret = require(__dirname + '/../secret.json');
const dictionary = require(__dirname + '/../dictionary.json');
var language = process.argv[2];

if (!language) {
    language = dictionary.languages[0];
}

async function main() {
    const bot = new TelegramBot(secret.telegram, { polling: true });
    const manager = new NlpManager({ languages: dictionary.languages });

    dictionary.intents.forEach((intent) => {
        intent.expressions.forEach((expression) => {
            manager.addDocument(intent.language, expression, intent.name);
        });
        intent.answers.forEach((answer) => {
            manager.addAnswer(intent.language, intent.name, answer);
        });
    });
    Object.keys(dictionary.defaults).forEach((language) => {
        dictionary.defaults[language].forEach((text) => {
            manager.addAnswer(language, 'None', text);
        });
    });
    await manager.train();
    bot.on('message', async (message) => {
        console.log(message.chat.id + '$<- ' + message.text);
        const response = await manager.process(language, message.text);
        console.log('INTENT: ' + response.intent);
        console.log(message.chat.id + '$-> ' + response.answer);
        bot.sendMessage(message.chat.id, response.answer);
    });
}

main();
