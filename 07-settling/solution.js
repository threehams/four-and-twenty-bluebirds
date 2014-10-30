// partial success, such as database/service calls which cannot be rolled back
// allows for retry or notification
// Promise.settle along with PromiseInspection

// - write to database
// - call to external service
// - if both succeed, return success
// - if both fail, return error
// - if
// - if still fails, return a specific error

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = Promise.promisifyAll(require('request'));

var promises = [
  fs.writeFileAsync('./out.json', JSON.stringify({message: 'writing a file!'})),
  request.getAsync('http://www.gfdsafdsaoogle.com')
];

Promise.settle(promises).then(function(results) {
  if (results[0].isRejected() && results[1].isRejected()) {
    throw new Error('File and server requests failed');
  }
  if (results[0].isRejected()) {
    return request.delAsync('http://www.google.com').then(function() {
      throw new Error(results[0].reason());
    });
  } else if (results[1].isRejected()) {
    return fs.unlinkAsync('./out.json').then(function() {
      throw new Error(results[1].reason());
    });
  }
}).then(function() {
  console.log('done!');
}).catch(console.log);
