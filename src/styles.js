export default function styles() {
    this.styles = [
        'body {' +
        '}',
        '.participant-visit-listing {' +
        '    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;' +
        '    font-size: 16px;' +
        '    line-height: normal;' +
        '}',
        '.pvl-hidden {' +
        '    display: none !important;' +
        '}',
        '.participant-visit-listing > * {' +
        '    width: 100%;' +
        '    display: inline-block;' +
        '}',

        /***--------------------------------------------------------------------------------------\
          Upper row
        \--------------------------------------------------------------------------------------***/

            '.pvl-row--upper {' +
            '    padding-bottom: 12px;' +
            '}',
            '.pvl-row--upper > * {' +
            '    vertical-align: bottom;' +
            '    display: inline-block;' +
            '}',

            /****---------------------------------------------------------------------------------\
              Legend
            \---------------------------------------------------------------------------------****/

                '.pvl-legend {' +
                '    width: 44%;' +
                '    float: left;' +
                '    padding-top: 16px;' +
                '}',
                '.pvl-legend__ul {' +
                '    list-style-type: none;' +
                '    margin: 0;' +
                '    padding: 0;' +
                '    overflow: hidden;' +
                '}',
                '.pvl-legend__li {' +
                '    float: left;' +
                '    margin-right: 1%;' +
                '    width: 24%;' +
                '    text-align: center;' +
                '}',
                '.pvl-legend-item-info-icon {' +
                '    margin-left: 4px;' +
                '    font-weight: bold;' +
                '    cursor: help;' +
                '}',

            /****---------------------------------------------------------------------------------\
              Controls
            \---------------------------------------------------------------------------------****/

                '.pvl-controls {' +
                '    width: 55%;' +
                '    float: right;' +
                '}',
                '.pvl-controls .wc-controls {' +
                '    float: right;' +
                '    margin-bottom: 0;' +
                '}',
                '.pvl-controls .wc-controls .control-group {' +
                '    margin-bottom: 0;' +
                '    width: 125px;' +
                '}',
                '.pvl-controls .wc-controls .control-group:last-child {' +
                '    margin-right: 0;' +
                '}',
                '.pvl-controls .wc-controls .control-group > * {' +
                '    width: 100%;' +
                '}',
                '.pvl-controls .wc-controls .control-group .wc-control-label {' +
                '    margin-right: 5px;' +
                '    text-align: right;' +
                '}',

        /***--------------------------------------------------------------------------------------\
          Lower row
        \--------------------------------------------------------------------------------------***/

            '.pvl-row--lower {' +
            '}',
            '.pvl-row--lower > * {' +
            '}',

            /****---------------------------------------------------------------------------------\
              Tabs
            \---------------------------------------------------------------------------------****/

                '.pvl-tabs {' +
                '    text-align: center;' +
                '    border-top: 1px solid lightgray;' +
                '    border-bottom: 1px solid lightgray;' +
                '    padding: 6px 0;' +
                '}',
                '.pvl-tab {' +
                '    display: inline-block;' +
                '    border: 2px solid black;' +
                '    border-radius: 6px;' +
                '    padding: 1px 24px;' +
                '    font-size: 20px;' +
                '    margin: 0 2px;' +
                '    color: black;' +
                '    background: white;' +
                '    cursor: pointer;' +
                '    font-weight: normal;' +
                '}',
                '.pvl-tab--active {' +
                '    color: white;' +
                '    background: black;' +
                '    font-weight: bold;' +
                '    cursor: default;' +
                '}',
                '.pvl-tab:hover {' +
                '    color: white;' +
                '    background: black;' +
                '    font-weight: bold;' +
                '}',

            /****---------------------------------------------------------------------------------\
              Charts
            \---------------------------------------------------------------------------------****/

                '.pvl-charts {' +
                '    width: 100%;' +
                '    display: inline-block;' +
                '}',
                '.pvl-chart {' +
                '    display: inline-block;' +
                '}',
                '.pvl-chart--ordinal {' +
                '    width: 49.5%;' +
                '    float: left;' +
                '}',
                '.pvl-chart--linear {' +
                '    width: 49.5%;' +
                '    float: right;' +
                '}',
                '.pvl-chart .axis-title--top {' +
                '    font-size: 16px;' +
                '    font-weight: bold;' +
                '}' +

            /****---------------------------------------------------------------------------------\
              Listing
            \---------------------------------------------------------------------------------****/

                '.pvl-listing {' +
                '}',
                '.pvl-listing .wc-table {' +
                '    width: 100%;' +
                '    overflow-x: scroll;' +
                '}',
                '.pvl-listing .wc-table table {' +
                '    display: table;' +
                '    border: 0;' +
                '    border-collapse: collapse;' +
                '    min-width: 100%;' +
                '}',

                /*****----------------------------------------------------------------------------\
                  thead
                \----------------------------------------------------------------------------*****/

                    '.pvl-listing .wc-table table thead {' +
                    '}',
                    '.pvl-listing .wc-table table thead tr:after {' +
                    '    content: "";' +
                    '    overflow-y: scroll;' +
                    '    visibility: hidden;' +
                    '    height: 0;' +
                    '}',
                    '.pvl-listing .wc-table table thead tr th {' +
                    '    flex: 1 auto;' +
                    '    display: block;' +
                    '    border-top: 2px solid white;' +
                    '    border-right: 2px solid white;' +
                    '    border-left: 2px solid white;' +
                    '}',


                /*****----------------------------------------------------------------------------\
                  tbody
                \----------------------------------------------------------------------------*****/

                    '.pvl-listing .wc-table table tbody {' +
                    '    display: block;' +
                    '    width: 100%;' +
                    '    overflow-y: auto;' +
                    '    height: 66vh;' +
                    '}',
                    '.pvl-listing .wc-table table tbody tr td {' +
                    '    cursor: default;' +
                    '    flex: 1 auto;' +
                    '    word-wrap: break-word;' +
                    '}',
                    '.pvl-listing .wc-table table tr:nth-child(odd) td {' +
                    '    border-right: 2px solid white;' +
                    '    border-left: 2px solid white;' +
                    '}',
                    '.pvl-listing .wc-table table tr:nth-child(even) td {' +
                    '    border-right: 2px solid #eee;' +
                    '    border-left: 2px solid #eee;' +
                    '}',
                    '.pvl-listing .wc-table table tbody tr td:nth-child(2) {' +
                    '    cursor: help;' +
                    '}',
                    '.pvl-listing .wc-table table tbody tr td.pvl-emboldened {' +
                    '    font-weight: bold;' +
                    '}',

                /*****----------------------------------------------------------------------------\
                  t-agnostic
                \----------------------------------------------------------------------------*****/

                    '.pvl-listing .wc-table table tr {' +
                    '    display: flex;' +
                    '}',
                    '.pvl-listing .wc-table table th,' +
                    '.pvl-listing .wc-table table td {' +
                    '    flex: 1 auto;' +
                    '    width: 100px;' +
                    '}',
                    '.pvl-listing .wc-table table tr th.pvl-header-hover,' +
                    '.pvl-listing .wc-table table tr td.pvl-header-hover {' +
                    '    border-right: 2px solid #aaa;' +
                    '    border-left: 2px solid #aaa;' +
                    '}',
                    '.pvl-listing .wc-table table tr th.pvl-header-hover {' +
                    '    border-top: 2px solid #aaa;' +
                    '}',
                    '.pvl-listing .wc-table table tbody tr:last-child td.pvl-header-hover {' +
                    '    border-bottom: 2px solid #aaa !important;' +
                    '}',

    ];

    //Attach styles to DOM.
    this.style = document.createElement('style');
    this.style.type = 'text/css';
    this.style.innerHTML = this.styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(this.style);
    this.containers.style = d3.select(this.style);
}
