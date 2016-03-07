'use strict';

var jsTokens = require('js-tokens');

var searchRe = /(?:\b(?:require|import|export)\b)/;

var stringRe = /^['"]/;
var spaceOrCommentRe = /^(?:\s|[/][/*])/;

module.exports = function(src) {
  // "require" or "import" must be in the source:
  if (!searchRe.test(src)) return [];

  jsTokens.lastIndex = 0;
  var parts = src.match(jsTokens);
  var found = extract(parts);
  return found;
};

function extract(parts) {
  var found = [];
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    if (part === 'import' || part === 'from') {
      var nextCodeToken = getAdjacentCodeToken(1, parts, i);
      if (stringRe.test(nextCodeToken.token)) {
        found.push(nextCodeToken.token.slice(1, -1));
        i = nextCodeToken.index;
      }
    } else if (part === 'require') {
      var prevCodeToken = getAdjacentCodeToken(-1, parts, i);
      var nextCodeToken = getAdjacentCodeToken(1, parts, i);
      if (prevCodeToken.token !== '.' &&
          nextCodeToken.token === '(') {
        var arg = getAdjacentCodeToken(1, parts, nextCodeToken.index);
        if (stringRe.test(arg.token)) {
          var closing = getAdjacentCodeToken(1, parts, arg.index);
          if (closing.token === ')' ||
              closing.token === ',') {
            found.push(arg.token.slice(1, -1));
            i = closing.index;
          }
        }
      }
    }
  }
  return found;
}

function getAdjacentCodeToken(dir, parts, i) {
  while (true) {
    var part = parts[i += dir];
    if (!spaceOrCommentRe.test(part)) {
      return {
        token: part,
        index: i,
      };
    }
  }
}
