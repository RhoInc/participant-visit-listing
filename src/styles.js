export default function styles() {
    this.styles = [
        'body {' +
        '    overflow-y: scroll;' +
        '}',
        '.participant-visit-listing {' +
        '    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;' +
        '    font-size: 16px;' +
        '    line-height: normal;' +
        '}',
        '.participant-visit-listing > * {' +
        '    width: 100%;' +
        '}',
        '.pvl-controls {' +
        '    height: 5vh;' +
        '}',
        '.pvl-legend {' +
        '}',
        '.pvl-listing {' +
        '}',
        '.pvl-listing .wc-table {' +
        '    overflow: auto;' +
        '    height: 80vh;' +
        '}',
        '.pvl-listing .wc-table table {' +
        '    width: 100%;' +
        '    display: table;' +
        '}',
        '.pvl-listing .wc-table table thead {' +
        '    border: 2px solid black;' +
        '    outline: 2px solid black;' +
        '    background: #fff;' +
        '}',
        '.pvl-listing .wc-table table thead tr {' +
        '}',
        '.pvl-listing .wc-table table thead tr th {' +
        '}',
        //'.pvl-listing thead,' +
        //'.pvl-listing tbody,' +
        //'.pvl-listing tr,' +
        //'.pvl-listing td,' +
        //'.pvl-listing th {' +
        //'}',
        //'.pvl-listing tbody {' +
        //'    height: 120px;' +
        //'    overflow-y: auto;' +
        //'}',
        //'.pvl-listing tr:after {' +
        //'    content: " ";' +
        //'    display: block;' +
        //'    visibility: hidden;' +
        //'    clear: both;' +
        //'}',
    ];

    //Attach styles to DOM.
    this.style = document.createElement('style');
    this.style.type = 'text/css';
    this.style.innerHTML = this.styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(this.style);
    this.containers.style = d3.select(this.style);
}
