# console-success

[![npm version](https://img.shields.io/npm/v/console-success.svg)](https://npmjs.org/package/console-success)
[![npm downloads](https://img.shields.io/npm/dm/console-success.svg)](https://npmjs.org/package/console-success)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/console-success)](https://bundlephobia.com/result?p=console-success)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/tufantunc/node-console-success)

> A lightweight library that adds a `console.success()` method for logging colored success messages with checkmark icons in both Node.js and browser environments.

## ✨ Features

- 🎨 **Colored output** with green styling and checkmark icons
- 🌐 **Cross-platform** - works in Node.js and browsers
- 📦 **Tiny size** - only 880 bytes (0.47 kB gzipped)
- 🚀 **Zero dependencies** - lightweight and fast
- 🔧 **Easy to use** - simple API, works out of the box

## 📦 Installation

```bash
npm install console-success
```

## ⚠️ Browser Limitations

When using `console.success()` in browser environments, objects and arrays are converted to JSON strings:

```javascript
console.success({status: 'ok'});  // Browser: {"status":"ok"} | Node.js: { status: 'ok' }
console.success([1, 2, 3]);        // Browser: [1,2,3] | Node.js: [ 1, 2, 3 ]
```

This is a browser console limitation with styled logging. The Node.js version preserves full object formatting.

## 🚀 Usage

### Node.js
```javascript
require('console-success');

console.success('Task completed successfully!');
console.success(new Date()); // Works with any data type
```

### Browser (ES Modules)
```javascript
import 'console-success';

console.success('Hello from the browser!');
```

### Browser (Script Tag)
```html
<script src="https://unpkg.com/console-success@latest/dist/index.js"></script>
<script>
  console.success("Hello world!");
</script>
```

## 🎯 Examples

### Sample Output
![Sample Output](assets/sample.jpg)

### Code Examples
```javascript
// Basic usage
console.success('Operation completed');

// With different data types
console.success(42);
console.success({ status: 'success', data: 'example' });
console.success(['item1', 'item2', 'item3']);

// In async operations
async function fetchData() {
  try {
    const data = await api.getData();
    console.success('Data fetched successfully');
    return data;
  } catch (error) {
    console.error('Failed to fetch data');
  }
}
```

## 📊 Bundle Size

- **Minified**: 880 bytes (0.88 kB)
- **Gzipped**: 0.47 kB
- **Dependencies**: 0

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run tests
npm run test

# Run E2E tests
npm run test:e2e

# Build
npm run build

# Run all tests
npm run test:all
```

## 📄 License

MIT © [Tufan Tunç](https://tufantunc.com)

## 🔗 Links

- [Live Demo](https://tufantunc.github.io/node-console-success/)
- [GitHub Repository](https://github.com/tufantunc/node-console-success)
- [NPM Package](https://npmjs.org/package/console-success)
