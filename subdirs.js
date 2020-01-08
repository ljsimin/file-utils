const fs = require('fs');

(async () => {
  console.log('start');
  const files = fs.readdirSync('.', { withFileTypes: true })
    .filter(f => !f.isDirectory())
    .map(f => f.name);
  console.log({files});

  files.forEach((file) => {
    const dirname = (file.substr(0, file.lastIndexOf('.')) || file).replace(/cd[0-9]/gi,'');
    console.log(file, dirname);

    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }

    fs.renameSync(file, `${dirname}/${file}`);
  });
})();
