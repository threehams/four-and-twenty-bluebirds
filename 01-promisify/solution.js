// promisify one method, probably fs
'use strict';

var Promise = require('bluebird');
var fs = require('fs');
var readFileAsync = Promise.promisify(fs.readFile);

readFileAsync('data.json').then(JSON.parse).then(function(data) {
  console.log(data.message);
});