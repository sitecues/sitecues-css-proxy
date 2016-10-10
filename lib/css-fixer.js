// Re-write URLs in @import statements of CSS responses to route them through
// the proxy, so that we can ensure they arrive at the browser with the
// necessary Access Control headers.

'use strict';

const url = require('url');
const { isAbsolute, isOriginRelative } = require('url-type');

const proxyImports = (css, option) => {
    const importPattern = /@import (?:url\()?(['"]).+?\1\)?/g;

    return css.replace(importPattern, (match, quote) => {
        // Extract everything between the quotes.
        const importUrl = match.substring(
            match.indexOf(quote, '@import '.length) + 1,
            match.lastIndexOf(quote)
        );

        if (!importUrl) {
            return match;
        }

        const toProxyPath = (targetUrl) => {
            return '/' + targetUrl;
        };

        let fixedUrl;

        if (isAbsolute(importUrl)) {
            fixedUrl = toProxyPath(importUrl);
        }
        else if (isOriginRelative(importUrl)) {
            fixedUrl = toProxyPath(url.resolve(
                option.targetUrl,
                importUrl
            ));
        }
        else {
            return match;
        }

        return '@import ' + quote + fixedUrl + quote;
    });
};

module.exports = {
    proxyImports
};
