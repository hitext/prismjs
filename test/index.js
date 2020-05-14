const assert = require('assert');
const hitext = require('hitext');
const prism = require('../src');

describe('hitext-prism', () => {
    it('basic', () => {
        const actual = hitext([prism('js')], 'html').print(
            'const a = 123;'
        );

        assert.equal(
            actual,
            '<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>'
        );
    });

    it('with use', () => {
        const preset = hitext()
            .use(prism('js'))
            .printer('html');

        assert.equal(
            preset.print('const a = 123;'),
            '<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>'
        );
    });

    it('with default printer do nothing', () => {
        const code = 'const a = 123;';
        const actual = hitext
            .use(prism('js'), () => {})
            .print(code, 'html');

        assert.equal(
            actual,
            code
        );
    });

    it('extra syntax', () => {
        require('prismjs/components/prism-jsx');

        const actual = hitext.use(prism('jsx'))
            .print('<div className={foo}>Hello world!</div>', 'html');

        assert.equal(
            actual,
            '<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token script"><span class="token script-punctuation">=</span><span class="token punctuation">{</span>foo<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span>Hello world<span class="token operator">!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>'
        );
    });
});
