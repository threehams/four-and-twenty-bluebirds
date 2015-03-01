'use strict';

var Promise = require('bluebird');
var exercise = require('workshopper-exercise')();
var filecheck = require('workshopper-exercise/filecheck');
var execute = require('workshopper-exercise/execute');
var comparestdout = require('workshopper-exercise/comparestdout');
var wrappedexec = require('workshopper-wrappedexec');
var fs = Promise.promisifyAll(require('fs'));
var faker = require('faker');
var http = require('http');

// checks that the submission file actually exists
exercise = filecheck(exercise);

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise);

// compare stdout of solution and submission
exercise = comparestdout(exercise);

exercise.addSetup(function (mode, callback) {
  // mode == 'run' || 'verify'

  this.fastServer = http.createServer(function (req, res) {
    res.write(JSON.stringify({message: 'mark'}));
    res.end();
  });

  this.slowServer = http.createServer(function (req, res) {
    setTimeout(function() {
      res.write(JSON.stringify({message: 'oh hai'}));
      res.end();
    }, 200);
  });

  this.fastServer.listen(0, function () {
    this.slowServer.listen(0, function () {
      var slowUrl = 'http://localhost:' + String(this.slowServer.address().port);
      var fastUrl = 'http://localhost:' + String(this.fastServer.address().port);

      // give the url as the first cmdline arg to the child processes
      this.submissionArgs = [slowUrl, fastUrl];
      this.solutionArgs = [slowUrl, fastUrl];

      callback();
    }.bind(this));
  }.bind(this));
});

exercise.addCleanup(function (mode, passed, callback) {
  // mode == 'run' || 'verify'

  if (!this.server)
    return process.nextTick(callback)

  this.server.close(callback)
});
module.exports = exercise;