const { tokenize, languages } = global.Prism || require('prismjs');
const printer = {
    html: {
        open({ data: type }) {
            return '<span class="token ' + type + '">';
        },
        close() {
            return '</span>';
        }
    }
};

function processTokens(tokens, createRange, offset) {
    tokens.forEach(function(entry) {
        if (typeof entry !== 'string') {
            processToken(entry, createRange, offset);
        }

        offset += entry.length;
    });
}

function processToken(entry, createRange, offset) {
    createRange(offset, offset + entry.length, entry.type);

    if (Array.isArray(entry.content)) {
        processTokens(entry.content, createRange, offset);
    }
}

module.exports = function(lang) {
    return {
        printer,
        ranges: function(source, createRange) {
            return processTokens(tokenize(source, languages[lang]), createRange, 0);
        }
    };
};
