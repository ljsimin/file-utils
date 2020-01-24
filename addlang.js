const fs = require('fs');
const recursive = require('recursive-readdir');
const LanguageDetect = require('languagedetect');

const previewLength = 0x2000;
const maxSize = 0x4000000; // 64mb

const langMap = {
    'english': 'en',
    'polish': 'pl',
    'serbian': 'sr',
    'croatian': 'sr'
};

(async () => {
  console.log('start');
  const files = (await recursive('.'))
    .filter(file => file.includes('.txt') || file.includes('.srt') || file.includes('.sub'))
    .filter(file => !file.includes('.en.'))
    .filter(file => !file.includes('.sr.'))
    .filter(file => !file.includes('.pl.'))

  files.forEach(file => {
      if (fs.statSync(file).size > maxSize) return;
      const content = fs.readFileSync(file).toString('utf-8', 0, previewLength);
     
      const lang = langMap[language(file, content)];
      if (lang) {
          const ext = extension(file);
          const newName = `${withoutExtension(file)}[addlang.js].${lang}.${ext}`;

          console.log(file + ' -> ' + newName);
          fs.renameSync(file, newName);
      } else {
          console.log(`no language for ${file}`)
      }
  });
  
})();

function withoutExtension(filename) {
    return filename.substr(0, filename.lastIndexOf('.')) || filename
}

function extension(filename) {
    return filename.substr(filename.lastIndexOf('.') + 1, filename.length) || filename
}

function language(filename, text) {
    const lang = new LanguageDetect();

    function autodetect(filename, text) {
        const detected = lang.detect(text)[0];
        return detected && detected[0]
    }
    
    function byContent(filename, text) {
        if (text.includes('ó')) {
            return 'polish'
        }

        if (text.includes('č')) {
            return 'serbian'
        }

        if (text.includes(' the ')) {
            return 'english'
        }

        if (filename.toLowerCase().includes('English')) {
            return 'english'
        }
    }

    return autodetect(filename, text) || byContent(filename, text);
}

