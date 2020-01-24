const fs = require('fs');
const recursive = require('recursive-readdir');
const iconv = require('iconv-lite');

const previewLength = 0x2000;
const maxSize = 0x4000000; // 64mb

(async () => {
  console.log('start');
  const files = (await recursive('.'))
    .filter(file => file.includes('.txt') || file.includes('.srt') || file.includes('.sub'))

  files.forEach(file => {
      if (fs.statSync(file).size > maxSize) return;

      const buffer = fs.readFileSync(file);
      const utf8 = buffer.toString('utf-8', 0, previewLength);

      if (utf8.includes('�')) {
        console.log(file);
        const cp1250 = iconv.decode(fs.readFileSync(file), 'cp-1250');
        fs.writeFileSync(file, cp1250);
      }
  });
  
})();

