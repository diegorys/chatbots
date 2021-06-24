'use strict';

const request = require('./request');
const NLP = require('./nlp');
const Telegram = require('./telegram');

async function main() {
    try {
        console.log(process.env);
        const nlp = new NLP(request.dictionary);
        const manager = await nlp.generateManager();
        const telegram = new Telegram(request.token, request.language, manager);
        telegram.start();
    } catch (error) {
        console.log(`[ERROR]: ${error.message}`);
    }
}

main();
