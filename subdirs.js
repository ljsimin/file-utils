const fs = require('fs');
const self = __filename.slice(__dirname.length + 1);

(async () => {
  console.log('start');
  const files = fs.readdirSync('.', { withFileTypes: true })
    .filter(f => f.name !== self)
    .filter(f => !f.isDirectory())
    .map(f => f.name);
  console.log({files});

  files.forEach((file) => {
    const dirname = file.substr(0, file.lastIndexOf('.')) || file;
    console.log(file, dirname);

    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }

    fs.renameSync(file, `${dirname}/${file}`);
  });
})();
