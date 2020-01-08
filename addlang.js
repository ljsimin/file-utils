const fs = require('fs');
const recursive = require('recursive-readdir');
const LanguageDetect = require('languagedetect');

const lang = new LanguageDetect();
(async () => {
  console.log('start');
  const files = (await recursive('.'))
    .filter(file => file.includes('.txt') || file.includes('.srt') || file.includes('.sub'))

  files.forEach(file => {
      const language = lang.detect(fs.readFileSync(file, 'utf-8'))[0]
      console.log(file,language)
  });
  
})();
