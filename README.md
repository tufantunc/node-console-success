# node-console-success [![NPM version][npm-image]][npm-url] [![codecov][codecov-image]][codecov-url] [![Downloads][downloads-image]][downloads-url] [![License][license-image]][license-url] [![twitter][twitter-badge]][twitter]
> console.success function logs colored messages with success icon on terminal and browser console too.

Sample result:

![console.success result image](/assets/sample.jpg)

## Browser & Node Supports
This package supports most common browsers and node versions.
To check this on your browser, [click here](https://codepen.io/tufantunc/pen/XWbggaa)

It's only 584 bytes and 354 bytes gzipped.

## Install
```
npm install console-success --save
```

## How to Use in Node
```js
require('console-success');
console.success(new Date()); // log time now
console.success('All test successfully completed'); // log text
```

## How to Use in Browser
If you use module bundler like Webpack, Rollup etc.
```js
import 'console-success';

console.success(new Date()); // log time now
console.success('All test successfully completed'); // log text
```

Or you can directly add in your html:
```html
<script src="https://cdn.jsdelivr.net/gh/tufantunc/node-console-success/dist/index.js"></script>
<script>
console.success("Hello world!");
</script>
```

## CDN
Unpkg:
```
https://unpkg.com/console-success@1.0.3/dist/index.js
```
JsDeliver:
```
https://cdn.jsdelivr.net/gh/tufantunc/node-console-success/dist/index.js
```

[npm-image]: https://img.shields.io/npm/v/console-success.svg
[npm-url]: https://npmjs.org/package/console-success
[downloads-image]: https://img.shields.io/npm/dm/console-success.svg
[downloads-url]: https://npmjs.org/package/console-success
[license-image]: https://img.shields.io/:license-mit-blue.svg
[license-url]: LICENSE.md
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20console-success%20by%20%40tufant%20https%3A%2F%2Fgithub.com%2Ftufantunc%2Fnode-console-success%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/tufantunc/node-console-success.svg?style=social
[codecov-image]: https://codecov.io/gh/tufantunc/node-console-success/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/tufantunc/node-console-success
