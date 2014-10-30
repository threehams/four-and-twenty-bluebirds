// this is nice - promisify an entire module and call a few things in it

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync('in.json').then(JSON.parse).then(function(data) {
  data.message = 'New message';
  return data;
}).then(function(data) {
  return fs.writeFileAsync('out.json', JSON.stringify(data))
}).catch(console.log);