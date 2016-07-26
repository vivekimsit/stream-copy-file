'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const streamCopyFile = require('./');

const ErrorCode = {
  FILE_NOT_EXISTS: 'ENOENT'
}

function noop() {}

function src(p) {
  return path.join('/tmp', p);
}

function dest(p) {
  return path.join('/tmp', p);
}

function equalSync(path, actual) {
  // Without encoding node returns instances of Buffer.
  let destContent = fs.readFileSync(src(path), 'utf8');
  assert.equal(destContent, actual);
}

function createFile(path, content) {
  fs.writeFileSync(src(path), content);
}

afterEach(function deleteFiles() {
  try {
    fs.unlinkSync(src('in.txt'));
    fs.unlinkSync(src('out.txt'));
  } catch (err) {
    // failed copy doesn't create the file
    // hence passing it silently.
  }
});

describe('Copy', function() {

  it('should raise error for non-exitent src', function(done) {
    streamCopyFile(src('meow.txt'), dest('out.txt'),
      function(err) {
        assert.strictEqual(err.code, ErrorCode.FILE_NOT_EXISTS);
        done();
      });
  });

  it('should raise error for invalid src type', function(done) {
    streamCopyFile(noop, dest('out.txt'),
      function(err) {
        assert.strictEqual(err.name, 'TypeError');
        done();
      });
  });

  it('should raise error for invalid dest type', function(done) {
    streamCopyFile(noop, noop,
      function(err) {
        assert.strictEqual(err.name, 'TypeError');
        done();
      });
  });

  it('should copy empty file', function(done) {
    let srcPath  = 'in.txt';
    let destPath = 'out.txt';
    createFile(srcPath, '');
    streamCopyFile(src(srcPath), dest(destPath), function(err) {
      if (err) throw err;
      equalSync(destPath, '');
      done();
    });
  });

  it('should copy file with texts', function(done) {
    let srcPath  = 'in.txt';
    let destPath = 'out.txt';
    createFile(srcPath, 'bazingaaa');
    streamCopyFile(src(srcPath), dest(destPath), function(err) {
      if (err) throw err;
      equalSync(destPath, 'bazingaaa');
      done();
    });
  });
});
