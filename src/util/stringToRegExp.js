export default function stringToRegExp(string) {
    let regex;
    if (typeof string === 'string' && string !== '') {
        const flags = string.replace(/.*?\/([gimy]*)$/, '$1'); // capture regex flags from end of regex string
        const pattern = string.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1'); // capture regex pattern from beginning of regex string
        regex = new RegExp(pattern, flags);
    } else regex = null;

    return regex;
}
