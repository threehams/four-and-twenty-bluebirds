// if your library returns promises, no one will ever use your library
// (but they'll appreciate it when your errors are always propogated)

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

function getThings(property, callback) {
  return fs.readFileAsync('./data.json').then(JSON.parse).then(function (data) {
    return data[property];
  }).nodeify(callback);
}

getThings('message').then(console.log).catch(console.log);
getThings('message', function (err, result) {
  if (err) return console.log(err);

  console.log(result);
  var getThingsAsync = Promise.promisify(getThings);
  getThingsAsync('message').then(console.log).catch(console.log);
});
