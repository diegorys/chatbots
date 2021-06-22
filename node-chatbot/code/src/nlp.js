const { NlpManager } = require('node-nlp');

class NLP {

    constructor(dictionary) {
        this.dictionary = dictionary;
    }

    async generateManager() {
        const manager = new NlpManager({ languages: this.dictionary.languages });

        this.dictionary.intents.forEach((intent) => {
            intent.expressions.forEach((expression) => {
                manager.addDocument(intent.language, expression, intent.name);
            });
            intent.answers.forEach((answer) => {
                manager.addAnswer(intent.language, intent.name, answer);
            });
        });
        Object.keys(this.dictionary.defaults).forEach((language) => {
            this.dictionary.defaults[language].forEach((text) => {
                manager.addAnswer(language, 'None', text);
            });
        });
        console.log(`[INFO]: Training language model, please wait...`);
        await manager.train();
        return manager;
    }
}

module.exports = NLP;
