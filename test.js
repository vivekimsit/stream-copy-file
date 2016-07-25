'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const streamCopyFile = require('.');

const noop = function() {};

function from(src) {
  return path.join('/tmp', src);
}

function to(dest) {
  return path.join('/tmp', dest);
}

function equalSync(src, dest) {
  // Without encoding node returns instances of Buffer.
  //let srcContent  = fs.readFileSync(from(src), 'utf8');
  let destContent = fs.readFileSync(from(dest), 'utf8');
  assert.equal(destContent, '');
}

beforeEach(function createFile() {
  fs.writeFileSync(from('in.txt'), '');
});

describe('Copy', function() {
  it('should copy empty file', function(done) {
    let src  = 'in.txt';
    let dest = 'out.txt';
    streamCopyFile(from(src), to(src), function(err) {
      if (err) throw err;
      equalSync(src, dest);
      done();
    });
  });
});
