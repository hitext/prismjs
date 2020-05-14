const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');

module.exports = {
    input: 'src/index.js',
    output: [
        { name: 'hitextPrismjs', format: 'umd', file: 'dist/hitext-prismjs.js' },
        { name: 'hitextPrismjs', format: 'umd', file: 'dist/hitext-prismjs.min.js' }
    ],
    plugins: [
        resolve({ browser: true }),
        commonjs({ ignoreGlobal: true, ignore: ['prismjs'] }),
        terser({ include: /\.min\./ })
    ]
};
