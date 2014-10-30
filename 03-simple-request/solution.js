// show how at first, these seem exactly the same

var Promise = require('bluebird');
var request = require('request');


Promise.promisifyAll(request);

request.getAsync('https://www.google.com').spread(function (response, body) {
  console.log(response.statusCode, body.length);
}).catch(function(err) {
  console.log(err);
});