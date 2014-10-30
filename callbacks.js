var fs = require('fs');

function run(callback) {
  fs.readFile('data.json', function (err, data) {
    if (err) return callback(err);

    try {
      data = JSON.parse(data);
    } catch(err) {
      return callback(err);
    }
    var id = data.pork;
    fs.readFile('data2.json', function (err, data) {
      if (err) return callback(err);

      try {
        data = JSON.parse(data);
      } catch(err) {
        return callback(err);
      }

      return callback(data[id]);
    });
  });
}

run(function(err, result) {
  if (err) return console.log(err.stack);

  console.log(result);
});