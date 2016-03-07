#!/usr/bin/env node
'use strict';

var fs = require('fs');
var detect = require('../');

var files = process.argv.slice(2);

var dtime = 0;
for (var i = 0; i < files.length; i++) {
  var file = files[i];
  var src = fs.readFileSync(file, 'utf8');

  var start = process.hrtime();
  var found = detect(src);
  var diff = process.hrtime(start);
  dtime += diff[0] * 1e9 + diff[1];

  console.log('%j %j', file, found);
}

console.log('took %dms', (dtime / 1e6).toFixed(2));
