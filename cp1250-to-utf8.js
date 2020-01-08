const fs = require('fs');
const recursive = require('recursive-readdir');
const iconv = require('iconv-lite');

(async () => {
  console.log('start');
  const files = (await recursive('.'))
    .filter(file => file.includes('.txt') || file.includes('.srt') || file.includes('.sub'))

  files.forEach(file => {
      const utf8 = fs.readFileSync(file, 'utf-8');
      if (utf8.includes('�')) {
        console.log(file);
        const cp1250 = iconv.decode(fs.readFileSync(file), 'cp-1250');
        fs.writeFileSync(file, cp1250);
      }
  });
  
})();

