// show how at first, these seem exactly the same

var Promise = require('bluebird');
var request = require('request');

Promise.promisifyAll(request);

request.get('https://www.google.com', function (err, response, body) {
  if (err) return console.log(err.stack);

  console.log(response.statusCode, body.length);
});

request.getAsync('https://www.google.com').spread(function (response, body) {
  console.log(response.statusCode, body.length);
}).catch(function(err) {
  console.log(err.stack);
});