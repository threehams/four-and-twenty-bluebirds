'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var exercise = require('workshopper-exercise')();
var filecheck = require('workshopper-exercise/filecheck');
var execute = require('workshopper-exercise/execute');
var comparestdout = require('workshopper-exercise/comparestdout');
var fs = Promise.promisifyAll(require('fs'));
var faker = require('faker');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var expect = require('chai').expect;


// checks that the submission file actually exists
exercise = filecheck(exercise);

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise);

//exercise = comparestdout(exercise);

exercise.addSetup(function (mode, callback) {
  var filename = faker.name.firstName() + '.json';

  this.submissionArgs.unshift(filename);
  this.solutionArgs.unshift(filename);

  fs.writeFileAsync(filename, JSON.stringify({message: 'promisified!'})).then(function () {
    callback();
  }).catch(function(err) {
    callback(err);
  });
});

exercise.addVerifyProcessor(function (callback) {
  var submissionModule = require('../../' + this.submission);
  submissionModule(this.submissionArgs[0]).bind(this).then(function(message) {
    try {
      expect(message).to.equal('promisified!');
      this.emit('pass', exercise.__('pass.expectedReturn'));
      callback(null, true);
    } catch (err) {
      this.emit('fail', err.message);
      callback(null, false);
    }
  }).catch(function(err) {
    callback(err);
  });
});

exercise.addVerifyProcessor(function (callback) {
  var spy = sinon.spy(Promise, 'promisify');
  var submissionModule = proxyquire('../../' + this.submission, { 'bluebird': Promise });
  submissionModule(this.submissionArgs[0]).bind(this).then(function(message) {
    if (spy.called) {
      this.emit('pass', exercise.__('pass.expectedPromisify'));
      callback(null, true);
    } else {
      this.emit('fail', exercise.__('pass.expectedPromisify'));
      callback(null, false);
    }
  }).catch(function(err) {
    callback(err);
  }).finally(function() {
    Promise.promisify.restore();
  });
});

exercise.addVerifyProcessor(function (callback) {
  var submissionModule = require('../../' + this.submission);
  submissionModule('pork').bind(this).then(function() {
    this.emit('fail', exercise.__('pass.expectedReadError'));
    callback(null, false);
  }).catch(function(err) {
    if (/ENOENT/.test(err.message)) {
      this.emit('pass', exercise.__('pass.expectedReadError'));
      callback(null, true);
    } else {
      this.emit('fail', exercise.__('pass.expectedReadError'));
      callback(null, false);
    }
  });
});

module.exports = exercise;