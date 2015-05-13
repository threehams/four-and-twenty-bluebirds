'use strict';

var Promise = require('bluebird');
var request = Promise.promsifyAll(require('request'));

module.exports = function(url, cache) {
  return request.getAsync('https://www.google.com').spread(function (response, body) {
    return body.length;
  });
};
