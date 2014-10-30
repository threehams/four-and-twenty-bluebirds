var Promise = require('bluebird');
var request = require('request');
Promise.promisifyAll(request);

request.getAsync('http://www.google.com').then(function (response) {
  console.log(response.statusCode);
}).catch(console.log);