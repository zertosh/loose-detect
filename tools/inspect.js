#!/usr/bin/env node
'use strict';

var fs = require('fs');
var jsTokens = require('js-tokens');

var file = process.argv[2];
var src = fs.readFileSync(file, 'utf8');

var start = process.hrtime();
var parts = src.match(jsTokens);
var diff = process.hrtime(start);
var dtime = diff[0] * 1e9 + diff[1];

console.log(parts);
console.log('took %dms', (dtime / 1e6).toFixed(2));
