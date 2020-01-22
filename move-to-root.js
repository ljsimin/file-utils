const fs = require('fs');

(async () => {
  console.log('start');
  const directories = fs.readdirSync('.', { withFileTypes: true })
    .filter(f => f.isDirectory())
    .map(f => f.name);

  directories.forEach((dir) => {
    let files = fs.readdirSync(dir);
    files.forEach(file => {
        fs.renameSync(`${dir}/${file}`, file)
    })
    files = fs.readdirSync(dir);
    if (!files.length) {
      console.log(dir);
      fs.rmdirSync(dir);
    }
  });
})();
