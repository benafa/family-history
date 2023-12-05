// This file is needed as when using WebPack with CSS
// It will create empty JS files 
// These should be cleaned up for prod 

const fs = require('fs');
const path = require('path');

const directory = path.resolve(__dirname, '../docs/assets/js'); 

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    if (path.extname(file) === '.js') {
      fs.readFile(path.join(directory, file), 'utf8', (err, data) => {
        if (err) throw err;

        if (data.trim() === '') {
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
            console.log(`${file} was empty and has been removed`);
          });
        }
      });
    }
  }
});