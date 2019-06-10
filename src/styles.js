import { select } from 'd3';

export default function styles() {
    this.styles = [
        'html.pvl-wait, html.pvl-wait * {' +
        '    cursor: wait !important;' +
        '}',
        'body.pvl-wait, body.pvl-wait * {' +
        '    cursor: wait !important;' +
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
                '    width: 35%;' +
                '    float: left;' +
                '}',
                '.pvl-legend__label {' +
                '    font-size: 24px;' +
                '    font-weight: lighter;' +
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
                '    width: 64%;' +
                '    float: right;' +
                '}',
                '.pvl-controls .wc-controls {' +
                '    float: right;' +
                '    margin-bottom: 0;' +
                '    width: 100%;' +
                '}',
                '.pvl-controls .wc-controls .control-group {' +
                '    margin: 0 .8% 0 0;' +
                '    width: 16%;' +
                '}',
                '.pvl-controls .wc-controls .control-group:last-child {' +
                '    margin-right: 0;' +
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
                '    font-size: 14px;' +
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
                '    position: relative;' +
                '}',
                '.pvl-viewing-n-participants {' +
                '    display: inline-block;' +
                '    right: 0;' +
                '    bottom: 0;' +
                '    position: absolute;' +
                '}',
                '.pvl-n-participants {' +
                '    font-weight: bold;' +
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
                '.pvl-loading {' +
                '    width: 100px;' +
                '    display: inline-block;' +
                '    position: absolute;' +
                '    top: 75px;' +
                '    left: 50%;' +
                '    margin-left: -50px;' +
                '}',
                '.pvl-loading > div {' +
                '    width: 15px;' +
                '    height: 15px;' +
                '    background-color: #0458ad;' +
                '    border-radius: 100%;' +
                '    display: inline-block;' +
                '    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;' +
                '    animation: sk-bouncedelay 1.4s infinite ease-in-out both;' +
                '}',
                '.pvl-loading .pvl-loading-ball--1 {' +
                '    -webkit-animation-delay: -0.32s;' +
                '    animation-delay: -0.32s;' +
                '}',
                '.pvl-loading .pvl-loading-ball--2 {' +
                '    -webkit-animation-delay: -0.16s;' +
                '    animation-delay: -0.16s;' +
                '}',
                '@-webkit-keyframes sk-bouncedelay {' +
                '    0%, 80%, 100% { -webkit-transform: scale(0) }' +
                '    40% { -webkit-transform: scale(1.0) }' +
                '}',
                '@keyframes sk-bouncedelay {' +
                '    0%, 80%, 100% { ' +
                '        -webkit-transform: scale(0);' +
                '        transform: scale(0);' +
                '    } 40% { ' +
                '        -webkit-transform: scale(1.0);' +
                '        transform: scale(1.0);' +
                '    }' +
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
                '    width: 100%;' +
                '}',
                '.pvl-charts .pvl-chart--ordinal {' +
                '    width: 49.5%;' +
                '    float: left;' +
                '}',
                '.pvl-charts .pvl-chart--linear {' +
                '    width: 49.5%;' +
                '    float: right;' +
                '}',
                '.pvl-floating-axis {' +
                '    width: 100%;' +
                '    z-index: 99;' +
                '    position: static;' +
                '}',
                '.pvl-floating-axis.pvl-sticky {' +
                '    position: fixed;' +
                '    top: 0;' +
                '    background-color: #F6F6F6;' +
                '    opacity: 0.8;' +
                '}',
                '.pvl-chart .axis-title--top {' +
                '    font-size: 16px;' +
                '    font-weight: bold;' +
                '}' +
                '.pvl-chart--full .pvl-chart-button {' +
                '    display: none;' +
                '}',
                '.pvl-chart .pvl-chart-button {' +
                '    font-size: 30px;' +
                '    cursor: pointer;' +
                '    fill: black;' +
                '}' +
                '.pvl-chart .pvl-chart-button:hover {' +
                '    fill: blue;' +
                '    stroke: blue;' +
                '}' +
                '.pvl-chart .pvl-chart-button--minimize {' +
                '}' +
                '.pvl-chart .pvl-chart-button--split {' +
                '    font-size: 24px;' +
                '}' +
                '.pvl-chart .pvl-chart-button--split:hover {' +
                '}' +
                '.pvl-chart .pvl-chart-button--maximize {' +
                '}' +
                '.pvl-unscheduled-legend-item,' +
                '.pvl-unscheduled-annotation {' +
                '    font-size: 14px;' +
                '    font-family: courier;' +
                '}',

            /****---------------------------------------------------------------------------------\
              Listing
            \---------------------------------------------------------------------------------****/

                '.pvl-listing {' +
                '}',
                '.pvl-listing .pvl-scroll-bar--outer {' +
                '    width: 100%;' +
                '    overflow-x: scroll;' +
                '    overflow-y: hidden;' +
                '}',
                '.pvl-listing .pvl-scroll-bar--upper {' +
                '    height: 20px;' +
                '}',
                '.pvl-listing .wc-table {' +
                '    overflow: none;' +
                '}',
                '.interactivity.pvl-cell-text-toggle {' +
                '    margin-right: 10px;' +
                '    border: 1px solid #aaa;' +
                '    border-radius: 5px;' +
                '    padding: 5px;' +
                '}',
                '.pvl-cell-text-toggle__label {' +
                '}',
                '.pvl-cell-text-toggle__checkbox {' +
                '    margin-left: 5px;' +
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
                    '}',


                /*****----------------------------------------------------------------------------\
                  tbody
                \----------------------------------------------------------------------------*****/

                    '.pvl-listing .wc-table table tbody {' +
                    '    display: block;' +
                    '    width: 100%;' +
                    '    overflow-y: auto;' +
                    '    height: 50vh;' +
                    '}',
                    '.pvl-listing .wc-table table tbody tr {' +
                    '    background: white !important;' +
                    '    border-bottom: 1px solid #eee;' +
                    '}',
                    '.pvl-listing .wc-table table tbody tr:hover {' +
                    '    border-bottom: 1px solid black;' +
                    '}',
                    '.pvl-listing .wc-table table tbody tr td {' +
                    '    cursor: default;' +
                    '    flex: 1 auto;' +
                    '    word-wrap: break-word;' +
                    '}',
                    '.pvl-listing .wc-table table tr td:nth-child(n+4) {' +
                    '    border-right: 1px solid #aaa;' +
                    '    border-left: 1px solid #aaa;' +
                    '}',
                    '.pvl-listing .wc-table table tbody tr td:nth-child(2) {' +
                    '    cursor: help;' +
                    '}',
                    '.wc-table table tbody tr:nth-child(even) td:nth-child(-n+3) {' +
                    '    background: #eee;' +
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
                    //'.pvl-listing .wc-table table tr th.pvl-header-hover,' +
                    //'.pvl-listing .wc-table table tr td.pvl-header-hover {' +
                    //'    border-right: 1px solid black;' +
                    //'    border-left: 1px solid black;' +
                    //'}',
                    //'.pvl-listing .wc-table table tr th.pvl-header-hover {' +
                    //'    border-top: 1px solid #aaa;' +
                    //'}',
                    //'.pvl-listing .wc-table table tbody tr:last-child td.pvl-header-hover {' +
                    //'    border-bottom: 1px solid #aaa !important;' +
                    //'}',

    ];

    //Attach styles to DOM.
    this.style = this.document.createElement('style');
    this.style.type = 'text/css';
    this.style.innerHTML = this.styles.join('\n');
    this.document.getElementsByTagName('head')[0].appendChild(this.style);
    this.containers.style = select(this.style);
}
