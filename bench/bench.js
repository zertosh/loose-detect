#!/usr/bin/env node
'use strict';

/*
The nuclide source is a mixture of ES5/ES6/ES7 with flow types.

$ rm -rf nuclide && \
  mkdir nuclide && \
  curl -L 'https://github.com/facebook/nuclide/archive/8c5862e.zip' |
  tar xz -C 'nuclide' --strip-components=1

$ find ./nuclide -type f -name '*.js' -print0 | xargs -0 ./bench.js
 */

var fs = require('fs');
var looseDetect = require('../');
var astDetect = require('../test/ast-detect');

var astTime = 0;
var looseTime = 0;

var files = process.argv.slice(2);
console.log('Looking at %s files', files.length);

var file;
while ((file = files.shift())) {
  var src = fs.readFileSync(file, 'utf8');

  var lstart = process.hrtime();
  var lfound = looseDetect(src);
  var ldiff = process.hrtime(lstart);
  looseTime += ldiff[0] * 1e9 + ldiff[1];

  var astart = process.hrtime();
  var afound = astDetect(src);
  var adiff = process.hrtime(astart);
  astTime += adiff[0] * 1e9 + adiff[1];

  if (!equal(lfound, afound)) {
    console.log('!!! %j %j %j', file, lfound, afound);
  }
}

console.log('  astTime %dms', (astTime / 1e6).toFixed(2));
console.log('looseTime %dms', (looseTime / 1e6).toFixed(2));

function equal(a, b) {
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
