const TelegramBot = require('node-telegram-bot-api')

class Telegram {

    constructor(token, language, manager) {
        if (!token) {
            throw new Error('Secret key for Telegram not provided');
        }
        this.token = token;
        this.language = language;
        this.manager = manager;
        this.bot = new TelegramBot(token, { polling: true });
    }

    async start() {
        this.bot.on('message', async (message) => {
            console.log(message.chat.id + '$<- ' + message.text);
            const response = await this.manager.process(this.language, message.text);
            console.log(`[INFO]: INTENT: ${response.intent}`);
            console.log(message.chat.id + '$-> ' + response.answer);
            this.bot.sendMessage(message.chat.id, response.answer);
        });
        console.log(`[INFO]: Bot started`);
    }

}

module.exports = Telegram;
