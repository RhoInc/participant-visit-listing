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
        '}',
        '.pvl-legend {' +
        '}',
        '.pvl-listing {' +
        '}',
        '.pvl-listing table {' +
        '    width: 100%;' +
        '    display: table;' +
        '}',
    ];

    //Attach styles to DOM.
    this.style = document.createElement('style');
    this.style.type = 'text/css';
    this.style.innerHTML = this.styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(this.style);
    this.containers.style = d3.select(this.style);
}
