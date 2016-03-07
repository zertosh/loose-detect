'use strict';

var test = require('tap').test;
var fs = require('fs');

var astDetect = require('./ast-detect');
var detect = require('../');

test('empties', function(t) {
  t.plan(1);
  var source = fs.readFileSync(__dirname + '/fixtures/empties.js', 'utf8');
  var actual = detect(source);
  var expected = astDetect(source);
  t.deepEqual(actual, expected);
});

test('import-export', function(t) {
  t.plan(1);
  var source = fs.readFileSync(__dirname + '/fixtures/import-export.js', 'utf8');
  var actual = detect(source);
  var expected = astDetect(source);
  t.deepEqual(actual, expected);
});

test('nested', function(t) {
  t.plan(1);
  var source = fs.readFileSync(__dirname + '/fixtures/nested.js', 'utf8');
  var actual = detect(source);
  var expected = astDetect(source);
  t.deepEqual(actual, expected);
});
