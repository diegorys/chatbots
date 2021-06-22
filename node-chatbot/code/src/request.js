const dictionary = require('/data/dictionary.json');
const token = process.env['TOKEN'];
let language = process.env['LNG'];

if (!language) {
    language = dictionary.languages[0];
    console.log(`[WARNING]: Language not provided. Used default: ${language}`);
} else {
    console.log(`[INFO]: Language: ${language}`);
}

module.exports = {
    dictionary: dictionary,
    token: token,
    language: language
}
