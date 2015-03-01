// cover error types and having multiple catch blocks for different errors
var Promise = require('bluebird');
var config = {};

function ConfigError(message) { this.message = message; }
ConfigError.prototype = Object.create(Error.prototype);

function runTest(url) {
  if (!config.hostname) throw new ConfigError('No hostname found. Add a valid hostname to config/test.');
}

Promise.resolve().then(function() {
  runTest('http://www.google.com/test.json');
}).then(function (results) {
  console.log(results);
}).catch(ConfigError, function (err) {
  console.log('Configuration error:', err.message);
});
