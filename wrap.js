// thanks: https://github.com/isRuslan/learn-generators
'use strict';

var fs = require('fs');

function wrap (ctx) {
  var submissionContent = fs.readFileSync(ctx.mainProgram, 'utf-8');

  // http://upshots.org/javascript/javascript-regexp-to-remove-comments
  submissionContent = submissionContent.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '');

  ctx.usedPromisify = !!/\.promisify[^A]/.test(submissionContent);
  ctx.usedPromisifyAll = !!/\.promisifyAll/.test(submissionContent);
}

module.exports = wrap;