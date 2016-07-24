'use strict';
const path = require('path');
const streamCopyFile = require('../');

let inp = path.join(__dirname, 'foo.txt');
let out = path.join(__dirname, 'out.txt');

streamCopyFile(inp, out, (err) => {
  console.log('Something went wrong ' + err);
});
