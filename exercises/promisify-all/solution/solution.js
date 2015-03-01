// this is nice - promisify an entire module and call a few things in it
'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

module.exports = function(inPath, outPath) {
  fs.readFileAsync(inPath).then(JSON.parse).then(function(data) {
    data.message = 'New message';
    return data;
  }).then(JSON.stringify).then(function(data) {
    return fs.writeFileAsync(outPath, data);
  });
};
