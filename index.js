'use strict';
const fs = require('fs');

module.exports = copyFile

function copyFile(src, dest, cb) {
  let readStream  = fs.createReadStream(src);
  let writeStream = fs.createWriteStream(dest);

  readStream.pipe(writeStream)
            .on('error', (err) => {
              cb.call(this, err);
            });

  cb.call(this, null)
}
