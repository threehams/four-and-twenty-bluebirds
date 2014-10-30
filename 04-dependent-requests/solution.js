// but once you start really using chains, callbacks require much more boilerplate

//var fs = require('fs');
//
//fs.readFile('./users.json', function (err, data) {
//  if (err) return console.log(err);
//
//  try {
//    data = JSON.parse(data);
//  } catch(err) {
//    return console.log(err);
//  }
//  var id = data.id;
//  fs.readFile('./photos.json', function (err, data) {
//    if (err) return console.log(err);
//
//    try {
//      data = JSON.parse(data);
//    } catch(err) {
//      return console.log(err);
//    }
//
//    console.log(data[id]);
//  });
//});

var fs = require('fs');
var Promise = require('bluebird');
var readFile = Promise.promisify(fs.readFile);

var id;

var run = readFile('users.json')
  .then(JSON.parse)
  .then(function(data) {
    id = data.id;
    return readFile('photos.json')
  })
  .then(JSON.parse)
  .then(function (data) {
    console.log(data[id]);
  })
  .catch(console.log);