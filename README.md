# loose-detect

[![Build Status](https://travis-ci.org/zertosh/loose-detect.svg?branch=master)](https://travis-ci.org/zertosh/loose-detect)

Fast (and loose) `require` and `import` extractor [js-tokens](https://github.com/lydell/js-tokens) instead of an AST.

## Gotchas

* Doesn't handle broken syntax.
* Doesn't look inside embedded expressions in template strings.
  - **This doesn't work:**
  ```js
  // "pretty-ms" will not be found
  console.log(`time: ${require('pretty-ms')(Date.now())}`);
  ```
* See https://github.com/lydell/js-tokens#limitations

## Usage

```sh
$ npm install loose-detect
```

```js
var detect = require('loose-detect');
console.log(detect('import a from "a"; require("b")'));
// ["a", "b"]
```

## Benchmark

```
$ find ./bench/nuclide -type f -name '*.js' -print0 | xargs -0 ./bench/bench.js
Looking at 1575 files
babylon & babel-traverse: 5651.09ms
loose-detect:             249.92ms
```
