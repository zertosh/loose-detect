/**
 * This is only for testing.
 */
'use strict';

var babylon = require('babylon');
var traverse = require('babel-traverse').default;

var searchRe = /\b(?:require|import)\b/;

module.exports = function astDetect(src) {
  // use the same string search optimization as loose-detect
  // so we can fairly benchmark the two.
  if (!searchRe.test(src)) return [];
  var ast = parse(src);
  if (!ast) return [];
  return extract(ast);
};

function extract(ast) {
  var found = [];
  traverse.cheap(ast, function(node) {
    if (
      node.type === 'CallExpression' &&
      node.callee.type === 'Identifier' &&
      node.callee.name === 'require' &&
      node.arguments[0] &&
      node.arguments[0].type === 'StringLiteral'
    ) {
      found.push(node.arguments[0].value);
      return;
    }

    if ((
      node.type === 'ImportDeclaration' ||
      node.type === 'ExportAllDeclaration' ||
      node.type === 'ExportNamedDeclaration'
    ) && (
      node.source &&
      node.source.type === 'StringLiteral'
    )) {
      found.push(node.source.value);
      return;
    }
  });
  return found;
}

function parse(src) {
  try {
    return babylon.parse(src, {
      sourceType: 'module',
      strictMode: false,
      allowImportExportEverywhere: true,
      allowReturnOutsideFunction: true,
      allowSuperOutsideMethod: true,
      plugins: [
        'flow',
        'jsx',
        'asyncFunctions',
        'asyncGenerators',
        'classConstructorCall',
        'classProperties',
        'decorators',
        'doExpressions',
        'exponentiationOperator',
        'exportExtensions',
        'functionBind',
        'functionSent',
        'objectRestSpread',
        'trailingFunctionCommas',
      ],
    });
  } catch(err) {
    return null;
  }
}
