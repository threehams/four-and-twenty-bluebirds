'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
Promise.longStackTraces();
var exercise = require('workshopper-exercise')();
var filecheck = require('workshopper-exercise/filecheck');
var execute = require('workshopper-exercise/execute');

var fs = Promise.promisifyAll(require('fs'));
var faker = require('faker');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var expect = require('chai').expect;
var path = require('path');
var rimraf = require('rimraf');

// checks that the submission file actually exists
exercise = filecheck(exercise);

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise);

exercise.addSetup(function (mode, callback) {
  this.tempDir = './temp-bluebird';
  this.tempFiles = {
    inFile: path.join(this.tempDir, faker.name.firstName() + '.json'),
    outFile: path.join(this.tempDir, faker.name.firstName() + '.json')
  };
  var args = [this.tempFiles.inFile, this.tempFiles.outFile];
  this.submissionArgs = this.solutionArgs = args;

  fs.mkdirAsync(path.resolve(this.tempDir)).catch(function(err) {
    if (!/EEXIST/.test(err.message)) throw err;
  }).bind(this).then(function() {
    return fs.writeFileAsync(this.tempFiles.inFile, JSON.stringify({message: 'Old message', otherData: 'Some unrelated data'}));
  }).then(function () {
    callback();
  }).catch(function(err) {
    console.log(err.stack);
    callback(err);
  });
});

exercise.addVerifyProcessor(function (callback) {
  var submissionModule = require('../../' + this.submission);
  submissionModule(this.submissionArgs[0], this.submissionArgs[1]).bind(this).then(function() {
    return fs.readFileAsync(this.tempFiles.outFile);
  }).then(function(data) {
    expect(JSON.parse(data)).to.eql({message: 'New message', otherData: 'Some unrelated data'});
    this.emit('pass', exercise.__('pass.expectedReturn'));
    callback(null, true);
  }).catch(function(err) {
    this.emit('fail', err.message);
    console.log(err.stack);
    callback(null, false);
  });
});

exercise.addVerifyProcessor(function (callback) {
  var spy = sinon.spy(Promise, 'promisifyAll');
  var submissionModule = proxyquire('../../' + this.submission, { 'bluebird': Promise });
  submissionModule(this.submissionArgs[0], this.submissionArgs[1]).bind(this).then(function(message) {
    if (spy.called) {
      this.emit('pass', exercise.__('pass.expectedPromisifyAll'));
      callback(null, true);
    } else {
      this.emit('fail', exercise.__('pass.expectedPromisifyAll'));
      callback(null, false);
    }
  }).catch(function(err) {
    callback(err);
  }).finally(function() {
    Promise.promisifyAll.restore();
  });
});

exercise.addVerifyProcessor(function (callback) {
  var submissionModule = require('../../' + this.submission);
  submissionModule('poooooork', 'porkopkrpokr').bind(this).then(function() {
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

// cleanup for both run and verify
exercise.addCleanup(function (mode, passed, callback) {
  rimraf(this.tempDir, callback);
});

module.exports = exercise;