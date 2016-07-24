'use strict';
const fs = require('fs');

module.exports = copyFile

function copyFile(src, dest, cb) {
  let readStream  = fs.createReadStream(src);
  let writeStream = fs.createWriteStream(dest);

  readStream.pipe(writeStream);

  readStream.on('error', (err) => {
    cb.call(null, err);
  });

  writeStream.on('error', (err) => {
    cb.call(null, err);
  });
}
