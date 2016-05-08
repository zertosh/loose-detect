'use strict';

var jsTokens = require('js-tokens');

var searchRe = /(?:\b(?:require|import|export)\b)/;

module.exports = function(src) {
  // "require", "import" or "export" must be in the source:
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
      var afterFrom = _next(parts, i);
      if (isStringToken(afterFrom.token)) {
        found.push(afterFrom.token.slice(1, -1));
        i = afterFrom.index;
        continue;
      }
    }

    if (part === 'require') {
      var beforeRequire = _prev(parts, i);
      var opening = _next(parts, i);
      var arg = _next(parts, opening.index);
      var closing = _next(parts, arg.index);
      if (
        beforeRequire.token !== '.' &&  // not property access
        opening.token === '(' &&        // method call
        isStringToken(arg.token) &&     // string first arg
        (
          closing.token === ')' ||      // not string concat
          closing.token === ','
        )
      ) {
        found.push(arg.token.slice(1, -1));
        i = closing.index;
        continue;
      }
    }
  }
  return found;
}

function isStringToken(token) {
  return /^['"]/.test(token);
}

function isSpaceOrCommentToken(token) {
  return /^(?:\s|[/][/*])/.test(token);
}

function _prev(parts, i) {
  while (isSpaceOrCommentToken(parts[--i]));
  return {token: parts[i], index: i};
}

function _next(parts, i) {
  while (isSpaceOrCommentToken(parts[++i]));
  return {token: parts[i], index: i};
}
