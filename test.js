const assert = require('assert');
const hitext = require('hitext');
const prism = require('./index');

// make extended html printer
const prismPrinter = hitext.printer.html
    .fork(prism.printer.html);

describe('hitext-prism', () => {
    it('basic', () => {
        const actual = hitext.decorate(
            'const a = 123;',
            [prism('js')],
            prismPrinter
        );

        assert.equal(
            actual,
            '<div><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span></div>'
        );
    });

    it('with use', () => {
        const preset = hitext()
            .use(prism('js'))
            .printer(prismPrinter);

        assert.equal(
            preset.decorate('const a = 123;'),
            '<div><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span></div>'
        );
    });

    it('with default printer do nothing', () => {
        const code = 'const a = 123;';
        const actual = hitext.decorate(
            code,
            [prism('js')],
            hitext.printer.html
        );

        assert.equal(
            actual,
            '<div>' + code + '</div>'
        );
    });

    it('extra syntax', () => {
        require('prismjs/components/prism-jsx');

        const actual = hitext.decorate(
            '<div className={foo}>Hello world!</div>',
            [prism('jsx')],
            prismPrinter
        );

        assert.equal(
            actual,
            '<div><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token script"><span class="token script-punctuation">=</span><span class="token punctuation">{</span>foo<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span>Hello world<span class="token operator">!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></div>'
        );
    });
});
