const { tokenize, languages } = require('prismjs');

module.exports = function(lang) {
    return function(source, createRange) {
        function processTokens(tokens, offset) {
            tokens.forEach(function(entry) {
                if (typeof entry !== 'string') {
                    processToken(entry, offset);
                }

                offset += entry.length;
            });
        }

        function processToken(entry, offset) {
            createRange('prism', offset, offset + entry.length, entry.type);

            if (Array.isArray(entry.content)) {
                processTokens(entry.content, offset);
            }
        }

        processTokens(tokenize(source, languages[lang]), 0);
    };
};

module.exports.printer = {
    html: {
        hooks: {
            prism: {
                open(type) {
                    return '<span class="token ' + type + '">';
                },
                close() {
                    return '</span>';
                }
            }
        }
    }
};
