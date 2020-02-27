import compiler from '@ampproject/rollup-plugin-closure-compiler';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: "console.success"
  },
  plugins: [
    commonjs(),
    compiler()
  ],
}