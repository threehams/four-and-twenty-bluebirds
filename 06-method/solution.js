// bind to use this within promise chain within 'class' yaaaaaay

function Model(opts) {
  this.id = opts.id;
  this.message = opts.message;
}

Model.prototype.save = Promise.method(function() {

});

var model = new Model({id: 1234, message: 'text'});
model.save();
