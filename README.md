# hitext-prism

[![NPM version](https://img.shields.io/npm/v/hitext-prism.svg)](https://www.npmjs.com/package/hitext-prism)
[![Build Status](https://travis-ci.org/hitext/prism.svg?branch=master)](https://travis-ci.org/hitext/prism)
[![Coverage Status](https://coveralls.io/repos/github/hitext/prism/badge.svg?branch=master)](https://coveralls.io/github/hitext/prism?branch=master)

[HiText](https://github.com/hitext/hitext) wrapper for [Prism.js](https://github.com/PrismJS/prism) wrapper.

## Why?

Prism is a great syntax highlighting library. But it has some limitations, one of them (like many such libraries have) is composing with other decoration libraries. Prism's introduction claims:

> Any pre-existing HTML in the code will be stripped off

And provides [some tricky ways](https://prismjs.com/faq.html#if-pre-existing-html-is-stripped-off-how-can-i-highlight) to walk around the problem. With HiText the problem can be solved in more elegant way.

For example, in [Basic usage](https://prismjs.com/index.html#basic-usage) section of Prism, it was required to break the code parts of the example to highlight some part.

## Install

```
npm install hitext hitext-prismjs prismjs
```

> NOTE: `prismjs` is a peer dependancy of `hitext-prismjs`, so you need to install it by your own. This allows you to update `prismjs` version without necessary to update `hitext-prismjs`.

## Usage

```js
const hitext = require('hitext');
const prism = require('prismjs');

// include additional syntaxes if needed (js, css and html are available by default)
require('prismjs/components/prism-jsx');

// make extended html printer
const printer = hitext.printer.html
    .fork(prism.printer.html);

// usage
console.log(
    hitext.decorate(
        '<div className={foo}>Hello world!</div>',
        [prism('jsx')],
        printer
    )
);

// or
const decorate = hitext()
    .use(prism('jsx'))
    .printer(printer);

console.log(
    decorate('<div className={foo}>Hello world!</div>')
);
```

Output:

```html
<div><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token script"><span class="token script-punctuation">=</span><span class="token punctuation">{</span>foo<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span>Hello world<span class="token operator">!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></div>
```

## License

MIT
