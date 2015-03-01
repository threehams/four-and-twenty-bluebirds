// bind to use this within promise chain within 'class' yaaaaaay

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

function Model(opts) {
  this.id = opts.id;
  this.message = opts.message;
}

Model.prototype.getMessage = Promise.method(function() {
  if (this.message) return this.message;

  return fs.readFileAsync('./model.json').bind(this).then(function(data) {
    var message = JSON.parse(data).message;
    this.message = message;
    return message;
  });
});

var model = new Model({id: 1234, message: 'text'});
model.getMessage().then(console.log).then(function() {
  var model = new Model({id: 1234});
  model.getMessage().then(console.log);
});

