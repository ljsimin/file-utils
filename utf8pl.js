const fs = require('fs');
const recursive = require('recursive-readdir');

const maxSize = 0x4000000; // 64mb

(async () => {
  console.log('start');
  const files = (await recursive('.'))
    .filter(file => file.includes('.txt') || file.includes('.srt') || file.includes('.sub'))

  files.forEach(file => {
    if (fs.statSync(file).size > maxSize) return;
    
    const utf8 = fs.readFileSync(file, 'utf-8');
    
//(³)|(ê)|(¿)|(æ)|(¹)|(œ)|(ñ)|(Ÿ)
//(?1ł)(?2ę)(?3ż)(?4ć)(?5ą)(?6ś)(?7ń)(?8ź)

      if (utf8.includes('æ')) {
        const replaced = utf8
        .replace(/³/g, 'ł')
        .replace(/ê/g, 'ę')
        .replace(/¿/g, 'ż')
        .replace(/æ/g, 'ć')
        .replace(/¹/g, 'ą')
        .replace(/œ/g, 'ś')
        .replace(/ñ/g, 'ń')
        .replace(/Ÿ/g, 'ź')

        console.log(file);
        fs.writeFileSync(file, replaced);
      }
  });
  
})();
