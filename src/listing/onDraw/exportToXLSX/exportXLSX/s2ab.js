//Convert XLSX file for download.
export default function s2ab(s) {
    let i;
    if (typeof ArrayBuffer !== 'undefined') {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);

        for (i = 0; i !== s.length; ++i)
            view[i] = s.charCodeAt(i) & 0xFF;

        return buf;
    } else {
        var buf = new Array(s.length);

        for (i = 0; i !== s.length; ++i)
            buf[i] = s.charCodeAt(i) & 0xFF;

        return buf;
    }
}
