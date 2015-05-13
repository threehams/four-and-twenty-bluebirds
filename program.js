'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

module.exports = function(inPath, outPath) {
  return fs.readFileAsync(inPath).then(JSON.parse).then(function(data) {
    data.message = 'New message';
    return data;
  }).then(JSON.stringify).then(function(data) {
    return fs.writeFileAsync(outPath, data);
  });
};
