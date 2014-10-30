// use map, reduce, filter, each

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var files = [
  fs.readFileAsync('./photos.json'),
  fs.readFileAsync('./videos.json')
];

Promise.all(files).map(function (file) {
  return JSON.parse(file);
}).each(function(item) { console.log(item); }); // note - .each returns more than just item normally