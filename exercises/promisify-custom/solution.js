'use strict';

var request = require('request');
function requestPromisifier(originalMethod) {
  // return a function
  return function promisified() {
    var args = [].slice.call(arguments);
    var self = this; // Needed so that the original method can be called with the correct receiver
    // which returns a promise
    return new Promise(function(resolve, reject) {
      args.push(resolve, reject);
      originalMethod.apply(self, args);
    });
  };
}

// Promisify e.g. chrome.browserAction
Promise.promisifyAll(request, {promisifier: requestPromisifier});

module.exports = function() {
  return request('http://www.google.com').then(function(response) {
    return JSON.parse(request.body);
  });
};
