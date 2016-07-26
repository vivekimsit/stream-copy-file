'use strict';
const fs = require('fs');

module.exports = copyFile

function copyFile(src, dest, cb) {
  if ('string' !== typeof src) return cb(new TypeError());

  let readStream  = fs.createReadStream(src);
  let writeStream = fs.createWriteStream(dest);

  readStream.pipe(writeStream);

  readStream.on('error', (err) => {
    cb(err);
  });

  readStream.on('close', () => {
    cb(null);
  });
}
