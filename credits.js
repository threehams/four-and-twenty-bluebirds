'use strict';

var fs = require('fs');
var path = require('path');
var colorsTmpl = require('colors-tmpl');
var combinedStream = require('combined-stream');

function read (file) {
  return fs.createReadStream(path.join(__dirname, file), {encoding: 'utf8'});
}

function credits (workshopper) {
  combinedStream
    .create()
    .append(read ('./i18n/credits/' + workshopper.lang + '.header.txt'))
    .append(read ('./credits.txt'))
    .append(read ('./i18n/credits/' + workshopper.lang + '.footer.txt'))
    .on('error', function (err) {
      console.log(err);
      throw err;
    })
    .on('data', function (data) {
      console.log(colorsTmpl(data));
    })
    .resume();
}

module.exports = credits;
