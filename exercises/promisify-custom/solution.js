'use strict';

var request = require('request');
function requestPromisifier(originalMethod) {
  // return a function
  return function promisified() {
    var args = [].slice.call(arguments);
    // Needed so that the original method can be called with the correct receiver
    var self = this;
    // which returns a promise
    return new Promise(function(resolve, reject) {
      args.push(resolve, reject);
      originalMethod.apply(self, args);
    });
  };
}

// Promisify e.g. chrome.browserAction
Promise.promisifyAll(request, {promisifier: requestPromisifier});

request('http://www.google.com').then(function(response) {
  console.log(JSON.parse(request.body));
});
