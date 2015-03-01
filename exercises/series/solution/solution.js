// cover .each for serial execution, explain why .all doesn't work the way you might think
'use strict';

var Promise = require('bluebird');
var requestAsync = Promise.promisify(require('request'));

Promise.each([process.argv[2], process.argv[3]], function(url) {
  return requestAsync(url).spread(function(request, body) {
    console.log(JSON.parse(body).message);
  });
});