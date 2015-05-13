'use strict';

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

module.exports = function(url, cache) {
  Promise.try(function() {
    if (cache) return cache;
    return request.getAsync(url).spread(function(request, body) {
      return body;
    });
  }).then(JSON.parse).then(function(data) {
    if (!data.message) throw new Error('Message is missing');
    return data.message;
  });
};
