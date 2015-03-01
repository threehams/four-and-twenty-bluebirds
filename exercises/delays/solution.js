// play around with delays and timeouts

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

var getData = function(retries) {
  retries = retries || 1;
  return request.getAsync('https://www.google.com').spread(function (response, body) {
    return body;
  }).catch(function () {
    console.log('could not connect to server, retrying');
    if (retries === 4) throw Error('could not connect to server after ' + retries + ' attempts');
    return Promise.delay(500 * retries).then(function () {
      return getData(retries + 1)
    });
  });
};

getData().get('length').then(console.log);
