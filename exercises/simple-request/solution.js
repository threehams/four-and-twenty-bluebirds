/*
 * With a single request, what's the real difference between a promise and a callback?
 *
 * Not much.
 *
 * With a Node-style callback, you receive both error and response with a single function.
 * With promises, you're looking at two functions, one with an error, and one with a response.
 * With simple examples, this is actually less code than the corresponding promise.
 *
 * Don't worry, we'll get to the good stuff as the examples become more complex.
 *
 */

'use strict';

var Promise = require('bluebird');
var request = require('request');

Promise.promisifyAll(request);
//
//request.get('https://www.google.com', function (err, response, body) {
//  if (err) return console.log(err);
//
//  console.log(response.statusCode, body.length);
//});

request.getAsync('https://www.google.com').spread(function (response, body) {
  console.log(response.statusCode, body.length);
}).catch(function(err) {
  console.log(err);
});