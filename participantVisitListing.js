(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.participantVisitListing = factory());
}(this, (function () { 'use strict';

if (typeof Object.assign != 'function') {
    Object.defineProperty(Object, 'assign', {
        value: function assign(target, varArgs) {
            // .length of function is 2
            'use strict';

            if (target == null) {
                // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) {
                    // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }

            return to;
        },
        writable: true,
        configurable: true
    });
}

if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function value(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, 'length')).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        }
    });
}

if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function value(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                // d. If testResult is true, return k.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return -1.
            return -1;
        }
    });
}

function rendererSettings() {
    return {
        site_col: 'site_name',
        id_col: 'subjectnameoridentifier',
        id_status_col: 'status',
        visit_col: 'visit_name',
        visit_order_col: 'Visit_number',
        visit_status_col: 'description',
        visit_color_col: 'description_color',
        pagination: false,
        exports: ['xlsx', 'csv']
    };
}

function syncSettings() {
    this.settings.rendererSynced = this.settings.rendererMerged;
}

function controlsSettings() {
    return {
        inputs: [{
            type: 'subsetter',
            value_col: null,
            label: 'Site'
        }, {
            type: 'subsetter',
            value_col: null,
            label: 'Participant Status'
        }]
    };
}

function syncControls() {
    this.settings.controls.inputs.find(function (control) {
        return control.label === 'Site';
    }).value_col = 'site'; //this.settings.rendererSynced.site_col;
    this.settings.controls.inputs.find(function (control) {
        return control.label === 'Participant Status';
    }).value_col = 'id_status'; //this.settings.rendererSynced.id_status_col;
    this.settings.controlsSynced = this.settings.controls;
}

var configuration = {
    rendererSettings: rendererSettings,
    syncSettings: syncSettings,
    controlsSettings: controlsSettings,
    syncControls: syncControls
};

function layout() {
    this.containers = {
        main: d3.select(this.element).append('div').classed('participant-visit-listing', true).attr('id', 'participant-visit-listing' + (d3.selectAll('.participant-visit-listing').size() + 1))
    };

    this.containers.upperRow = this.containers.main.append('div').classed('pvl-row pvl-row--upper', true);
    this.containers.controls = this.containers.upperRow.append('div').classed('pvl-controls', true);
    this.containers.legend = this.containers.upperRow.append('div').classed('pvl-legend', true);

    this.containers.lowerRow = this.containers.main.append('div').classed('pvl-row pvl-row--lower', true);
    this.containers.listing = this.containers.lowerRow.append('div').classed('pvl-listing', true);
}

function styles() {
    this.styles = ['body {' + '    overflow-y: scroll;' + '}', '.participant-visit-listing {' + '    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;' + '    font-size: 16px;' + '    line-height: normal;' + '}', '.participant-visit-listing > * {' + '    width: 100%;' + '}', '.pvl-controls {' + '    height: 5vh;' + '}', '.pvl-legend {' + '}', '.pvl-listing {' + '}', '.pvl-listing .wc-table {' + '    overflow: auto;' + '    height: 80vh;' + '}', '.pvl-listing .wc-table table {' + '    width: 100%;' + '    display: table;' + '}', '.pvl-listing .wc-table table thead {' + '    border: 2px solid black;' + '    outline: 2px solid black;' + '    background: #fff;' + '}', '.pvl-listing .wc-table table thead tr {' + '}', '.pvl-listing .wc-table table thead tr th {' + '}'];

    //Attach styles to DOM.
    this.style = document.createElement('style');
    this.style.type = 'text/css';
    this.style.innerHTML = this.styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(this.style);
    this.containers.style = d3.select(this.style);
}

function controls() {
    //Define controls.
    this.controls = new webCharts.createControls(this.containers.controls.node(), this.settings.controlsSynced);
}

function onInit() {}

function onLayout() {}

function onDraw() {
    this.tbody.selectAll('tr').each(function (d, i) {
        var row = d3.select(this);

        row.selectAll('td').each(function (di, j) {
            var cell = d3.select(this);
            di.color = (d[di.col + '-color'] || 'white').toLowerCase();

            //Apply cell border coloring.
            if (!/white/.test(di.color)) cell.style('border-bottom', '2px solid ' + (di.color === 'black' ? '#ccc' : di.color));

            //Apply cell text coloring.
            if (!/black|white/.test(di.color)) cell.style('color', di.color);
        });
    });

    //Highlight column when hovering over column header.
    this.thead.selectAll('th').on('mouseover', function (d, i) {
        var th = d3.select(this).style('outline', '1px solid black');
        d3.selectAll('tr td:nth-child(' + (i + 1) + ')').style('border-left', '1px solid black').style('border-right', '1px solid black');
    }).on('mouseout', function (d, i) {
        var th = d3.select(this).style('outline', 'none');
        d3.selectAll('tr td:nth-child(' + (i + 1) + ')').style('border-left', 'none').style('border-right', 'none');
    });

    //Float table header as user scrolls.
    this.wrap.on('scroll', function () {
        var thead = this.querySelector('thead');
        thead.style.transform = 'translate(0,' + this.scrollTop + 'px)';
    });
    var doc = new jsPDF();
    var elementHandler = {
        '#ignorePDF': function ignorePDF(element, renderer) {
            return true;
        }
    };
    var source = window.document.getElementsByTagName("body")[0];
    doc.fromHTML(source, 15, 15, {
        'width': 180, 'elementHandlers': elementHandler
    });

    doc.output("dataurlnewwindow");
}

function onDestroy() {}

function listing() {
    //Define listing.
    this.listing = new webCharts.createTable(this.containers.listing.node(), this.settings.rendererSynced, this.controls);

    //Define callbacks.
    this.listing.on('init', onInit);
    this.listing.on('layout', onLayout);
    //this.listing.on('preprocess', onPreprocess);
    this.listing.on('draw', onDraw);
    this.listing.on('destroy', onDestroy);
}

function defineSets() {
    var _this = this;

    ['site_col', 'id_col', 'id_status_col', 'visit_col', 'visit_status_col', 'visit_color_col'].forEach(function (col) {
        if (col !== 'visit_col') _this.data.sets[col] = d3.set(_this.data.raw.map(function (d) {
            return d[_this.settings.rendererSynced[col]];
        })).values().sort();else _this.data.sets[col] = d3.set(_this.data.raw.map(function (d) {
            return d[_this.settings.rendererSynced.visit_order_col] + ':|:' + d[_this.settings.rendererSynced.visit_col];
        })).values().sort(function (a, b) {
            return a.split(':|:')[0] - b.split(':|:')[0];
        }).map(function (visit) {
            return visit.split(':|:')[1];
        });
    });
}

function defineColumns() {
    this.listing.config.cols = ['Site/ID'].concat(this.data.sets.visit_col);
}

function transposeData() {
    var _this = this;

    this.data.sets.id_col.forEach(function (id) {
        var id_data = _this.data.raw.filter(function (d) {
            return d[_this.settings.rendererSynced.id_col] === id;
        });
        var datum = {
            id: id,
            site: id_data[0][_this.settings.rendererSynced.site_col],
            id_status: id_data[0][_this.settings.rendererSynced.id_status_col]
        };
        datum['Site/ID'] = datum.site + '/' + datum.id;
        _this.data.sets.visit_col.forEach(function (visit) {
            var visit_datum = id_data.find(function (d) {
                return d[_this.settings.rendererSynced.visit_col] === visit;
            });
            datum[visit] = visit_datum ? visit_datum[_this.settings.rendererSynced.visit_status_col] : null;
            datum[visit + '-color'] = visit_datum ? visit_datum[_this.settings.rendererSynced.visit_color_col] : null;
        });
        _this.data.transposed.push(datum);
    });
}

function init(data) {
    this.data = {
        raw: data,
        sets: {},
        transposed: []
    };
    defineSets.call(this);
    defineColumns.call(this);
    transposeData.call(this);
    this.listing.init(this.data.transposed);
}

function participantVisitListing(element) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    //Instantiate central object.
    var pvl = {
        element: element,
        settings: {
            user: settings,
            renderer: configuration.rendererSettings(),
            controls: configuration.controlsSettings()
        },
        init: init
    };

    //Merge and sync user settings with default settings.
    pvl.settings.rendererMerged = Object.assign(pvl.settings.renderer, pvl.settings.user);
    configuration.syncSettings.call(pvl);
    configuration.syncControls.call(pvl);

    layout.call(pvl); // attaches containers object to central object ([pvl])
    styles.call(pvl); // attaches styles object to central object ([pvl])
    controls.call(pvl); // attaches Webcharts controls object to central object ([pvl])
    listing.call(pvl); // attaches Webcharts table object to central object ([pvl])

    return pvl;
}

return participantVisitListing;

})));
