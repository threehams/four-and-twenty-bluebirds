// calling functions with .try()

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var cache = {
  config: {authToken: '0fbc2d2376c9bda0756b56da'}
};
var configFile = null;//'./config.json';

// in another require
function getAuthToken() {
  if (!configFile) throw new Error('Config file path has not been defined');
  if (cache['config'] && cache['config'].authToken) return cache['config'].authToken;
  return fs.readFileAsync(configFile).then(JSON.parse).get('authToken');
}

console.log(fs.readFileAsync);

// solution
Promise.try(getAuthToken).then(function (authToken) {
  console.log(authToken);
}).catch(function (err) {
  console.log(err.stack);
});