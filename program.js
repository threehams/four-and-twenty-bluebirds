'use strict';

var Promise = require('bluebird');
var fs = require('fs');
var readFileAsync = Promise.promisify(fs.readFile);

module.exports = function(file) {
  return readFileAsync(file).then(function(data) {
    return JSON.parse(data).message;
  });
};
