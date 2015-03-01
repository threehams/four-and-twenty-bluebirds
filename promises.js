#!/usr/bin/env node

'use strict';

var workshopper = require('workshopper');
var path = require('path');
var credits = require('./credits');

function fpath (f) {
  return path.join(__dirname, f);
}

workshopper({
  name: 'four-and-twenty-bluebirds',
  appDir: __dirname,
  languages: ['en'],
  menuItems   : [{
    name : 'credits',
    handler : credits
  }],
  exerciseDir : fpath('./exercises/')
});