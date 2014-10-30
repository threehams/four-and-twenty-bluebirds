// Recommend something silly like this

var Promise = require("bluebird");
var pmap = Promise.map;
var props = Promise.props;
var _ = require("lodash");
var fs = Promise.promisifyAll(require("fs"));

function getTotalSize(paths) {
  return pmap(paths, function(path) {
    return fs.statAsync(path).get("size");
  }).reduce(function(a, b) {
    return a + b;
  }, 0);
}

fs.readdirAsync(".").then(_)
  .call("groupBy", function(fileName) {
    return fileName.charAt(0);
  })
  .call("map", function(fileNames, firstCh) {
    return props({
      firstCh: firstCh,
      count: fileNames.length,
      totalSize: getTotalSize(fileNames)
    });
  })
  // Since the currently wrapped array contains promises we need to unwrap it and call .all() before continuing the chain
  // If the currently wrapped thing was an object with properties that might be promises, we would call .props() instead
  .call("value").all().then(_)
  .call("sortBy", "count")
  .call("reverse")
  .call("map", function(data) {
    return data.count + " total files beginning with " + data.firstCh + " with total size of " + data.totalSize + " bytes";
  })
  .call("join", "\n")
  .then(console.log)