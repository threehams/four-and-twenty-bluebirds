// but once you start dealing with multiple async operations, promises give you a single exception channel

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

'use strict';

var fs = require('fs');
var Promise = require('bluebird');
var readFileAsync = Promise.promisify(fs.readFile);

var id;

readFileAsync('users.json')
  .then(JSON.parse)
  .then(function(data) {
    id = data.id;
    return readFileAsync('photos.json')
  })
  .then(JSON.parse)
  .then(function (data) {
    console.log(data[id]);
  })
  .catch(console.log);