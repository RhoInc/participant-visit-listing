(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
            ? define(factory)
            : (global.participantVisitListing = factory());
})(this, function() {
    'use strict';

    if (typeof Object.assign != 'function') {
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) {
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
            //ID-level variables
            site_col: 'site_name',
            id_col: 'subjectnameoridentifier',
            id_status_col: 'subject_status',

            //Visit-level variables
            visit_col: 'visit_name',
            visit_order_col: 'visit_number',
            visit_date_col: 'visit_date',
            visit_status_col: 'visit_status',
            visit_status_order_col: 'visit_status_order',
            visit_text_col: 'visit_text',
            visit_text_color_col: 'visit_status_color', // must be hex RGB
            visit_status_description_col: 'visit_status_description',
            visit_exclusion_pattern: '/unscheduled|early termination|repeat/i',
            visit_status_exclusion_col: 'plot_exclude',
            visit_status_exclusion_value: 'Yes',

            //Miscellaneous
            date_format: '%Y-%m-%d', // format of visit dates
            filter_cols: ['subset1', 'subset2', 'subset3', 'overdue2'], // default filter variables
            pagination: false, // turn off pagination to view all IDs at the same time
            exports: ['xlsx', 'csv'] // default exports are to .xlsx and .csv
        };
    }

    function syncSettings() {
        var settings = this.settings.rendererMerged;

        //Convert visit_exclusion_pattern from string to regular expression.
        if (
            typeof settings.visit_exclusion_pattern === 'string' &&
            settings.visit_exclusion_pattern !== ''
        ) {
            var flags = settings.visit_exclusion_pattern.replace(/.*?\/([gimy]*)$/, '$1'); // capture regex flags from end of regex string
            var pattern = settings.visit_exclusion_pattern.replace(
                new RegExp('^/(.*?)/' + flags + '$'),
                '$1'
            ); // capture regex pattern from beginning of regex string
            settings.visit_exclusion_regex = new RegExp(pattern, flags);
        }

        //Assign settings to settings object.
        this.settings.rendererSynced = settings;
        Object.assign(this.settings, settings);
    }

    function controlsSettings() {
        return {
            inputs: [
                {
                    type: 'subsetter',
                    value_col: null,
                    label: 'Site'
                },
                {
                    type: 'subsetter',
                    value_col: null,
                    label: 'Participant Status'
                }
            ]
        };
    }

    function syncControls() {
        var _this = this;

        //Sync site filter.
        var siteFilter = this.settings.controls.inputs.find(function(control) {
            return control.label === 'Site';
        });
        siteFilter.value_col = this.settings.rendererSynced.site_col;

        //Sync ID status filter.
        var idStatusFilter = this.settings.controls.inputs.find(function(control) {
            return control.label === 'Participant Status';
        });
        idStatusFilter.value_col = this.settings.rendererSynced.id_status_col;

        //Add user-specified filters.
        if (
            Array.isArray(this.settings.rendererSynced.filter_cols) &&
            this.settings.rendererSynced.filter_cols
        ) {
            var labels = {
                subset1: 'Analysis Subset 1',
                subset2: 'Analysis Subset 2',
                subset3: 'Analysis Subset 3',
                overdue2: '>1 Overdue Visits'
            };
            this.settings.rendererSynced.filter_cols.forEach(function(filter_col) {
                _this.settings.controls.inputs.push({
                    type: 'subsetter',
                    label: labels[filter_col] || filter_col,
                    value_col: filter_col
                });
            });
        }

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
            main: d3
                .select(this.element)
                .append('div')
                .classed('participant-visit-listing', true)
                .attr(
                    'id',
                    'participant-visit-listing' +
                        (d3.selectAll('.participant-visit-listing').size() + 1)
                )
        };

        this.containers.upperRow = this.containers.main
            .append('div')
            .classed('pvl-row pvl-row--upper', true);
        this.containers.controls = this.containers.upperRow
            .append('div')
            .classed('pvl-controls', true);
        this.containers.legend = this.containers.upperRow.append('div').classed('pvl-legend', true);

        this.containers.lowerRow = this.containers.main
            .append('div')
            .classed('pvl-row pvl-row--lower', true);
        this.containers.listing = this.containers.lowerRow
            .append('div')
            .classed('pvl-listing', true);
    }

    function styles() {
        this.styles = [
            'body {' + '}',
            '.participant-visit-listing {' +
                '    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;' +
                '    font-size: 16px;' +
                '    line-height: normal;' +
                '}',
            '.participant-visit-listing > * {' +
                '    width: 100%;' +
                '    display: inline-block;' +
                '}',
            '.pvl-row--upper {' +
                '    border-bottom: 2px solid #eee;' +
                '    padding-bottom: 12px;' +
                '}',
            '.pvl-row--upper > * {' +
                '    vertical-align: bottom;' +
                '    display: inline-block;' +
                '}',
            '.pvl-controls {' + '    width: 55%;' + '    float: right;' + '}',
            '.pvl-controls .wc-controls {' + '    float: right;' + '    margin-bottom: 0;' + '}',
            '.pvl-controls .wc-controls .control-group {' +
                '    margin-bottom: 0;' +
                '    width: 125px;' +
                '}',
            '.pvl-controls .wc-controls .control-group:last-child {' + '    margin-right: 0;' + '}',
            '.pvl-controls .wc-controls .control-group > * {' + '    width: 100%;' + '}',
            '.pvl-controls .wc-controls .control-group .wc-control-label {' +
                '    margin-right: 5px;' +
                '    text-align: right;' +
                '}',
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
            '.pvl-listing {' + '}',
            '.pvl-listing .wc-table {' + '    width: 100%;' + '    overflow-x: scroll;' + '}',

            /***--------------------------------------------------------------------------------------\
                  table
                \--------------------------------------------------------------------------------------***/

            '.pvl-listing .wc-table table {' +
                '    display: table;' +
                '    border: 0;' +
                '    border-collapse: collapse;' +
                '    min-width: 100%;' +
                '}',

            /****---------------------------------------------------------------------------------\
                  thead
                \---------------------------------------------------------------------------------****/

            '.pvl-listing .wc-table table thead {' + '}',
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

            /****---------------------------------------------------------------------------------\
                  tbody
                \---------------------------------------------------------------------------------****/

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
            '.pvl-listing .wc-table table tbody tr td:nth-child(2) {' + '    cursor: help;' + '}',
            '.pvl-listing .wc-table table tbody tr td.pvl-emboldened {' +
                '    font-weight: bold;' +
                '}',

            /****---------------------------------------------------------------------------------\
                  t-agnostic
                \---------------------------------------------------------------------------------****/

            '.pvl-listing .wc-table table tr {' + '    display: flex;' + '}',
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
                '}'
        ];

        //Attach styles to DOM.
        this.style = document.createElement('style');
        this.style.type = 'text/css';
        this.style.innerHTML = this.styles.join('\n');
        document.getElementsByTagName('head')[0].appendChild(this.style);
        this.containers.style = d3.select(this.style);
    }

    function update() {
        var _this = this;

        var denominator = this.data.filtered.filter(function(d) {
            return (
                _this.data.sets.legend
                    .map(function(d) {
                        return d.split(':|:')[1];
                    })
                    .indexOf(d[_this.settings.visit_status_col]) > -1
            );
        }).length;
        this.containers.legendItems.select('.pvl-legend-item-label').text(function(d) {
            var numerator = _this.data.filtered.filter(function(di) {
                return di[_this.settings.rendererSynced.visit_status_col] === d[1];
            }).length;
            return (
                d[1] +
                ' (' +
                (denominator > 0 ? d3.format('%')(numerator / denominator) : 'N/A') +
                ')'
            );
        });
    }

    function controls() {
        var context = this;

        //Define controls.
        this.controls = new webCharts.createControls(
            this.containers.controls.node(),
            this.settings.controlsSynced
        );

        //Update legend when controls change.
        this.controls.wrap.on('change', function(d) {
            context.data.filtered = context.data.raw;
            context.listing.filters.forEach(function(filter) {
                context.data.filtered = context.data.filtered.filter(function(d) {
                    return filter.val === 'All' || d[filter.col] === filter.val;
                });
            });
            update.call(context);
        });
    }

    function onInit() {
        //this.data.raw.forEach(d => {
        //});
        this.data.initial = this.data.raw.slice();
    }

    function onLayout() {
        this.config.sortable = false;
    }

    function addHeaderHover() {
        //Highlight column when hovering over column header.
        this.thead
            .selectAll('th')
            .on('mouseover', function(d, i) {
                d3.select(this).classed('pvl-header-hover', true);
                d3.selectAll('tr td:nth-child(' + (i + 1) + ')').classed('pvl-header-hover', true);
            })
            .on('mouseout', function(d, i) {
                d3.select(this).classed('pvl-header-hover', false);
                d3.selectAll('tr td:nth-child(' + (i + 1) + ')').classed('pvl-header-hover', false);
            });
    }

    function addCellFormatting() {
        var context = this;

        this.tbody.selectAll('tr').each(function(d, i) {
            var row = d3.select(this);

            row.selectAll('td:nth-child(n+4)').each(function(di, j) {
                var cell = d3.select(this).classed('pvl-emboldened', /\d\d/.test(di.text));
                di.date = d[di.col + '-date'];

                //Add tooltip to cells.
                if (d[di.col] !== null)
                    cell.attr(
                        'title',
                        d[context.parent.settings.rendererSynced.id_col] +
                            ' - ' +
                            di.col +
                            ' (' +
                            di.date +
                            '): ' +
                            d[di.col + '-status']
                    );

                //Apply cell formmating.
                di.color = (d[di.col + '-color'] || 'white').toLowerCase();
                if (!/white/.test(di.color))
                    cell.style(
                        'border-bottom',
                        '2px solid ' + (di.color === 'black' ? '#ccc' : di.color)
                    ); // border-bottom
                if (!/black|white/.test(di.color)) cell.style('color', di.color); // color
            });
        });
    }

    function participant() {
        var _this = this;

        // create dictionary of id columns
        var idDict = d3
            .nest()
            .key(function(d) {
                return d[_this.parent.settings.rendererSynced.id_col];
            })
            .rollup(function(d) {
                return d;
            })
            .map(this.parent.data.raw);

        // get all the cells
        var cells = this.table.selectAll('tbody tr').selectAll('td:nth-child(2)');

        // create ditionary of table cells
        var cellDict = d3
            .nest()
            .key(function(d) {
                return d[0].__data__.text;
            })
            .rollup(function(d) {
                return d[0];
            })
            .map(cells);

        // get ids
        var id_cols = d3
            .set(
                this.data.filtered.map(function(d) {
                    return d[_this.parent.settings.rendererSynced.id_col];
                })
            )
            .values();

        id_cols.forEach(function(id) {
            var id_data = idDict[id];
            var id_summary = d3
                .nest()
                .key(function(d) {
                    return d[_this.parent.settings.rendererSynced.visit_status_col];
                })
                .rollup(function(d) {
                    return d3.format('%')(d.length / id_data.length);
                })
                .entries(id_data);
            d3.select(cellDict[id][0]).attr(
                'title',
                id_summary
                    .map(function(status) {
                        return status.key + ' (' + status.values + ')';
                    })
                    .join('\n')
            );
        });
    }

    function visit() {
        var _this = this;

        this.parent.data.sets.visit_col.forEach(function(visit) {
            var visit_data = _this.parent.data.raw.filter(function(d) {
                return d[_this.parent.settings.rendererSynced.visit_col] === visit;
            });
            var visit_summary = d3
                .nest()
                .key(function(d) {
                    return d[_this.parent.settings.rendererSynced.visit_status_col];
                })
                .rollup(function(d) {
                    return d3.format('%')(d.length / visit_data.length);
                })
                .entries(visit_data);
            var visit_cell = _this.table
                .selectAll('thead tr')
                .selectAll('th:not(:first-child)')
                .filter(function(d) {
                    return d === visit;
                });
            visit_cell.attr(
                'title',
                visit_summary
                    .map(function(status) {
                        return status.key + ' (' + status.values + ')';
                    })
                    .join('\n')
            );
        });
    }

    function addSummaries() {
        participant.call(this);
        visit.call(this);
    }

    function sortData(data) {
        var _this = this;

        this.data.raw = this.data.raw.sort(function(a, b) {
            var order = 0;

            _this.sortable.order.forEach(function(item) {
                var aCell = a[item.col + '-date'] ? a[item.col + '-date'] : a[item.col];
                var bCell = b[item.col + '-date'] ? b[item.col + '-date'] : b[item.col];

                if (order === 0) {
                    if (aCell !== null && bCell !== null) {
                        if (
                            (item.direction === 'ascending' && aCell < bCell) ||
                            (item.direction === 'descending' && aCell > bCell)
                        ) {
                            order = -1;
                        } else if (
                            (item.direction === 'ascending' && aCell > bCell) ||
                            (item.direction === 'descending' && aCell < bCell)
                        ) {
                            order = 1;
                        }
                    } else if (aCell === null) {
                        order = 2;
                    } else if (bCell === null) {
                        order = -2;
                    }
                }
            });

            return order;
        });
    }

    function onClick(th, header) {
        var context = this,
            selection = d3.select(th),
            col = this.config.cols[this.config.headers.indexOf(header)];

        //Check if column is already a part of current sort order.
        var sortItem = this.sortable.order.filter(function(item) {
            return item.col === col;
        })[0];

        //If it isn't, add it to sort order.
        if (!sortItem) {
            sortItem = {
                col: col,
                direction: 'ascending',
                wrap: this.sortable.wrap
                    .append('div')
                    .datum({ key: col })
                    .classed('wc-button sort-box', true)
                    .text(header)
            };
            sortItem.wrap
                .append('span')
                .classed('sort-direction', true)
                .html('&darr;');
            sortItem.wrap
                .append('span')
                .classed('remove-sort', true)
                .html('&#10060;');
            this.sortable.order.push(sortItem);
        } else {
            //Otherwise reverse its sort direction.
            sortItem.direction = sortItem.direction === 'ascending' ? 'descending' : 'ascending';
            sortItem.wrap
                .select('span.sort-direction')
                .html(sortItem.direction === 'ascending' ? '&darr;' : '&uarr;');
        }

        //Hide sort instructions.
        this.sortable.wrap.select('.instruction').classed('hidden', true);

        //Add sort container deletion functionality.
        this.sortable.order.forEach(function(item, i) {
            item.wrap.on('click', function(d) {
                //Remove column's sort container.
                d3.select(this).remove();

                //Remove column from sort.
                context.sortable.order.splice(
                    context.sortable.order
                        .map(function(d) {
                            return d.col;
                        })
                        .indexOf(d.key),
                    1
                );

                //Display sorting instruction.
                context.sortable.wrap
                    .select('.instruction')
                    .classed('hidden', context.sortable.order.length);

                //Redraw chart.
                if (context.sortable.order.length) sortData.call(context);
                else context.data.raw = context.data.initial.slice();
                context.draw();
            });
        });

        //Redraw chart.
        sortData.call(this);
        this.draw();
    }

    function sortChronologically() {
        var context = this;

        this.thead_cells.on('click', function(header) {
            onClick.call(context, this, header);
        });
    }

    var headerStyle = {
        font: {
            bold: true
        },
        fill: {
            fgColor: { rgb: 'FFcccccc' }
        },
        alignment: {
            wrapText: true
        }
    };

    var bodyStyle = {
        font: {
            sz: 10,
            color: {
                rgb: null // set in defineXLSX
            }
        },
        fill: {
            fgColor: {
                rgb: 'FFeeeeee'
            }
        },
        alignment: {
            wrapText: true
        },
        border: {
            bottom: {
                style: 'thick',
                color: {
                    rgb: null // set in defineXLSX
                }
            }
        }
    };

    function workBook() {
        this.SheetNames = [];
        this.Sheets = {};
    }

    function updateRange(range, row, col) {
        if (range.s.r > row) range.s.r = row;
        if (range.s.c > col) range.s.c = col;
        if (range.e.r < row) range.e.r = row;
        if (range.e.c < col) range.e.c = col;
    }

    function addCell(wb, ws, value, type, styles, range, row, col) {
        updateRange(range, row, col);
        styles.fill.fgColor.rgb = row > 0 && row % 2 ? 'FFffffff' : styles.fill.fgColor.rgb;
        var cell = { v: value, t: type, s: styles };
        var cell_ref = XLSX.utils.encode_cell({ c: col, r: row });
        ws[cell_ref] = cell;
    }

    var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? function(obj) {
                  return typeof obj;
              }
            : function(obj) {
                  return obj &&
                      typeof Symbol === 'function' &&
                      obj.constructor === Symbol &&
                      obj !== Symbol.prototype
                      ? 'symbol'
                      : typeof obj;
              };

    function clone(obj) {
        var copy = void 0;

        //boolean, number, string, null, undefined
        if ('object' != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) || null == obj)
            return obj;

        //date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        //array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        //object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }

        throw new Error('Unable to copy [obj]! Its type is not supported.');
    }

    function defineXLSX(listing) {
        var name = 'Participant Visit Listing';
        var wb = new workBook();
        var ws = {};
        var cols = [];
        var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
        var wbOptions = {
            bookType: 'xlsx',
            bookSST: true,
            type: 'binary'
        };

        var filterRange =
            'A1:' +
            String.fromCharCode(64 + listing.config.cols.length) +
            (listing.data.filtered.length + 1);

        //Header row
        listing.config.headers.forEach(function(header, col) {
            addCell(wb, ws, header, 'c', clone(headerStyle), range, 0, col);
        });

        //Data rows
        listing.data.filtered.forEach(function(d, row) {
            listing.config.cols.forEach(function(variable, col) {
                var cellStyle = clone(bodyStyle);
                var color = d[variable + '-color'];
                var fontColor = /^#[a-z0-9]{6}$/i.test(color)
                    ? color.replace('#', 'FF')
                    : 'FF000000';
                var borderColor = /^#[a-z0-9]{6}$/i.test(color)
                    ? color.replace('#', 'FF')
                    : 'FFCCCCCC';
                if (col > 2) {
                    cellStyle.font.color.rgb = fontColor;
                    cellStyle.border.bottom.color.rgb = borderColor;
                } else {
                    delete cellStyle.font.color.rgb;
                    delete cellStyle.border.bottom;
                }
                addCell(wb, ws, d[variable] || '', 'c', cellStyle, range, row + 1, col);
            });
        });

        //Define column widths.
        var tr = listing.tbody
            .selectAll('tr')
            //.filter(function() {
            //    return d3.select(this).style('display') === 'table-row'; })
            .filter(function(d, i) {
                return i === 0;
            });
        tr.selectAll('td').each(function(d, i) {
            cols.push({ wpx: i > 0 ? this.offsetWidth - 20 : 175 });
        });

        ws['!ref'] = XLSX.utils.encode_range(range);
        ws['!cols'] = cols;
        ws['!autofilter'] = { ref: filterRange };
        //ws['!freeze'] = { xSplit: '1', ySplit: '1', topLeftCell: 'B2', activePane: 'bottomRight', state: 'frozen' };

        wb.SheetNames.push(name);
        wb.Sheets[name] = ws;

        listing.XLSX = XLSX.write(wb, wbOptions);
    }

    /* FileSaver.js
     * A saveAs() FileSaver implementation.
     * 1.3.8
     * 2018-03-22 14:03:47
     *
     * By Eli Grey, https://eligrey.com
     * License: MIT
     *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
     */

    /*global self */
    /*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

    /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/src/FileSaver.js */

    var saveAs =
        saveAs ||
        (function(view) {
            // IE <10 is explicitly unsupported

            if (
                typeof view === 'undefined' ||
                (typeof navigator !== 'undefined' && /MSIE [1-9]\./.test(navigator.userAgent))
            ) {
                return;
            }
            var doc = view.document,
                // only get URL when necessary in case Blob.js hasn't overridden it yet
                get_URL = function get_URL() {
                    return view.URL || view.webkitURL || view;
                },
                save_link = doc.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
                can_use_save_link = 'download' in save_link,
                click = function click(node) {
                    var event = new MouseEvent('click');
                    node.dispatchEvent(event);
                },
                is_safari = /constructor/i.test(view.HTMLElement) || view.safari,
                is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
                setImmediate = view.setImmediate || view.setTimeout,
                throw_outside = function throw_outside(ex) {
                    setImmediate(function() {
                        throw ex;
                    }, 0);
                },
                force_saveable_type = 'application/octet-stream',
                // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
                arbitrary_revoke_timeout = 1000 * 40,
                // in ms
                revoke = function revoke(file) {
                    var revoker = function revoker() {
                        if (typeof file === 'string') {
                            // file is an object URL
                            get_URL().revokeObjectURL(file);
                        } else {
                            // file is a File
                            file.remove();
                        }
                    };
                    setTimeout(revoker, arbitrary_revoke_timeout);
                },
                dispatch = function dispatch(filesaver, event_types, event) {
                    event_types = [].concat(event_types);
                    var i = event_types.length;
                    while (i--) {
                        var listener = filesaver['on' + event_types[i]];
                        if (typeof listener === 'function') {
                            try {
                                listener.call(filesaver, event || filesaver);
                            } catch (ex) {
                                throw_outside(ex);
                            }
                        }
                    }
                },
                auto_bom = function auto_bom(blob) {
                    // prepend BOM for UTF-8 XML and text/* types (including HTML)
                    // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
                    if (
                        /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
                            blob.type
                        )
                    ) {
                        return new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type });
                    }
                    return blob;
                },
                FileSaver = function FileSaver(blob, name, no_auto_bom) {
                    if (!no_auto_bom) {
                        blob = auto_bom(blob);
                    }
                    // First try a.download, then web filesystem, then object URLs
                    var filesaver = this,
                        type = blob.type,
                        force = type === force_saveable_type,
                        object_url,
                        dispatch_all = function dispatch_all() {
                            dispatch(filesaver, 'writestart progress write writeend'.split(' '));
                        },
                        // on any filesys errors revert to saving with object URLs
                        fs_error = function fs_error() {
                            if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
                                // Safari doesn't allow downloading of blob urls
                                var reader = new FileReader();
                                reader.onloadend = function() {
                                    var url = is_chrome_ios
                                        ? reader.result
                                        : reader.result.replace(
                                              /^data:[^;]*;/,
                                              'data:attachment/file;'
                                          );
                                    var popup = view.open(url, '_blank');
                                    if (!popup) view.location.href = url;
                                    url = undefined; // release reference before dispatching
                                    filesaver.readyState = filesaver.DONE;
                                    dispatch_all();
                                };
                                reader.readAsDataURL(blob);
                                filesaver.readyState = filesaver.INIT;
                                return;
                            }
                            // don't create more object URLs than needed
                            if (!object_url) {
                                object_url = get_URL().createObjectURL(blob);
                            }
                            if (force) {
                                view.location.href = object_url;
                            } else {
                                var opened = view.open(object_url, '_blank');
                                if (!opened) {
                                    // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
                                    view.location.href = object_url;
                                }
                            }
                            filesaver.readyState = filesaver.DONE;
                            dispatch_all();
                            revoke(object_url);
                        };
                    filesaver.readyState = filesaver.INIT;

                    if (can_use_save_link) {
                        object_url = get_URL().createObjectURL(blob);
                        setImmediate(function() {
                            save_link.href = object_url;
                            save_link.download = name;
                            click(save_link);
                            dispatch_all();
                            revoke(object_url);
                            filesaver.readyState = filesaver.DONE;
                        }, 0);
                        return;
                    }

                    fs_error();
                },
                FS_proto = FileSaver.prototype,
                saveAs = function saveAs(blob, name, no_auto_bom) {
                    return new FileSaver(blob, name || blob.name || 'download', no_auto_bom);
                };

            // IE 10+ (native saveAs)
            if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
                return function(blob, name, no_auto_bom) {
                    name = name || blob.name || 'download';

                    if (!no_auto_bom) {
                        blob = auto_bom(blob);
                    }
                    return navigator.msSaveOrOpenBlob(blob, name);
                };
            }

            // todo: detect chrome extensions & packaged apps
            //save_link.target = "_blank";

            FS_proto.abort = function() {};
            FS_proto.readyState = FS_proto.INIT = 0;
            FS_proto.WRITING = 1;
            FS_proto.DONE = 2;

            FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;

            return saveAs;
        })(
            (typeof self !== 'undefined' && self) ||
                (typeof window !== 'undefined' && window) ||
                undefined
        );

    //Convert XLSX file for download.
    function s2ab(s) {
        var i = void 0;
        if (typeof ArrayBuffer !== 'undefined') {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);

            for (i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xff;
            }
            return buf;
        } else {
            var buf = new Array(s.length);

            for (i = 0; i !== s.length; ++i) {
                buf[i] = s.charCodeAt(i) & 0xff;
            }
            return buf;
        }
    }

    function exportXLSX(listing) {
        try {
            saveAs(
                new Blob([s2ab(listing.XLSX)], { type: 'application/octet-stream' }),
                'participant-visit-listing.xlsx'
            );
        } catch (error) {
            if (typeof console !== 'undefined') console.log(error);
        }
    }

    function exportToXLSX() {
        var _this = this;

        this.wrap.select('.export#xlsx').on('click', function() {
            defineXLSX(_this);
            exportXLSX(_this);
        });
    }

    function onDraw() {
        //Highlight column when hovering over column header.
        addHeaderHover.call(this);

        //Sort columns on click chronologically.
        sortChronologically.call(this);

        //Float table header as user scrolls.
        //floatHeader.call(this);

        //Add row and column summaries.
        addSummaries.call(this);

        //Add data-driven cell formatting.
        addCellFormatting.call(this);

        //Add styled export to .xlsx.
        exportToXLSX.call(this);
    }

    function onDestroy() {}

    function listing() {
        //Define listing.
        this.listing = new webCharts.createTable(
            this.containers.listing.node(),
            this.settings.rendererSynced,
            this.controls
        );
        this.listing.parent = this;

        //Define callbacks.
        this.listing.on('init', onInit);
        this.listing.on('layout', onLayout);
        //this.listing.on('preprocess', onPreprocess);
        this.listing.on('draw', onDraw);
        this.listing.on('destroy', onDestroy);
    }

    function defineSets() {
        var _this = this;

        [
            'site_col',
            'id_col',
            'id_status_col',
            'visit_col', // with visit_order_col
            'visit_status_col' // with visit_status_order_col, visit_text_color_col, and visit_status_description_col
        ].forEach(function(col) {
            switch (col) {
                case 'visit_col':
                    _this.data.sets[col] = d3
                        .set(
                            _this.data.raw.map(function(d) {
                                return (
                                    d[_this.settings.rendererSynced.visit_order_col] +
                                    ':|:' +
                                    d[_this.settings.rendererSynced.visit_col]
                                );
                            })
                        )
                        .values()
                        .filter(function(visit) {
                            return !_this.settings.visit_exclusion_regex.test(visit);
                        })
                        .sort(function(a, b) {
                            return a.split(':|:')[0] - b.split(':|:')[0];
                        })
                        .map(function(visit) {
                            return visit.split(':|:')[1];
                        });
                    break;
                case 'visit_status_col':
                    _this.data.sets[col] = d3
                        .set(
                            _this.data.raw.map(function(d) {
                                return (
                                    d[_this.settings.rendererSynced.visit_status_order_col] +
                                    ':|:' +
                                    d[_this.settings.rendererSynced.visit_status_col] +
                                    ':|:' +
                                    d[
                                        _this.settings.rendererSynced.visit_text_color_col
                                    ].toLowerCase() +
                                    ':|:' +
                                    d[_this.settings.visit_status_description_col]
                                );
                            })
                        )
                        .values()
                        .sort(function(a, b) {
                            return +a.split(':|:')[0] - +b.split(':|:')[0];
                        });
                    _this.data.sets.legend = d3
                        .set(
                            _this.data.raw
                                .filter(function(d) {
                                    return (
                                        d[_this.settings.visit_status_exclusion_col] !==
                                        _this.settings.visit_status_exclusion_value
                                    );
                                })
                                .map(function(d) {
                                    return (
                                        d[_this.settings.rendererSynced.visit_status_order_col] +
                                        ':|:' +
                                        d[_this.settings.rendererSynced.visit_status_col] +
                                        ':|:' +
                                        d[
                                            _this.settings.rendererSynced.visit_text_color_col
                                        ].toLowerCase() +
                                        ':|:' +
                                        d[_this.settings.visit_status_description_col]
                                    );
                                })
                        )
                        .values()
                        .sort(function(a, b) {
                            return +a.split(':|:')[0] - +b.split(':|:')[0];
                        });
                    break;
                default:
                    _this.data.sets[col] = d3
                        .set(
                            _this.data.raw.map(function(d) {
                                return d[_this.settings.rendererSynced[col]];
                            })
                        )
                        .values()
                        .sort();
                    break;
            }
        });
    }

    function defineColumns() {
        this.listing.config.cols = ['Site', 'ID', 'Status'].concat(this.data.sets.visit_col);
    }

    function checkFilterCols(filterCol) {
        this.data.missingVariables[filterCol] = this.data.variables.indexOf(filterCol) > -1;
        if (!this.data.missingVariables[filterCol])
            this.settings.controlsSynced.inputs = this.settings.controlsSynced.inputs.filter(
                function(input) {
                    return input.value_col !== filterCol;
                }
            );
    }

    function transposeData() {
        var _this = this;

        checkFilterCols.call(this, 'subset1');
        checkFilterCols.call(this, 'subset2');
        checkFilterCols.call(this, 'subset3');
        checkFilterCols.call(this, 'overdue2');

        this.data.sets.id_col.forEach(function(id, i) {
            var id_data = _this.data.raw.filter(function(d) {
                return d[_this.settings.id_col] === id;
            });
            var datum = {};
            datum[_this.settings.site_col] = id_data[0][_this.settings.site_col];
            datum['Site'] = datum[_this.settings.site_col];
            datum[_this.settings.id_col] = id;
            datum['ID'] = datum[_this.settings.id_col];
            datum[_this.settings.id_status_col] = id_data[0][_this.settings.id_status_col];
            datum['Status'] = datum[_this.settings.id_status_col];

            if (_this.data.missingVariables.overdue2) datum['overdue2'] = id_data[0]['overdue2'];

            _this.data.sets.visit_col.forEach(function(visit) {
                var visit_datum = id_data.find(function(d) {
                    return d[_this.settings.visit_col] === visit;
                });
                datum[visit] = visit_datum ? visit_datum[_this.settings.visit_text_col] : null;
                datum[visit + '-date'] = visit_datum
                    ? visit_datum[_this.settings.visit_date_col]
                    : null;
                datum[visit + '-status'] = visit_datum
                    ? visit_datum[_this.settings.visit_status_col]
                    : null;
                datum[visit + '-color'] = visit_datum
                    ? visit_datum[_this.settings.visit_text_color_col]
                    : null;

                if (_this.data.missingVariables.subset1) datum['subset1'] = id_data[0]['subset1'];
                if (_this.data.missingVariables.subset2) datum['subset2'] = id_data[0]['subset2'];
                if (_this.data.missingVariables.subset3) datum['subset3'] = id_data[0]['subset3'];
            });
            _this.data.transposed.push(datum);
        });
    }

    function addLegend() {
        this.containers.legendItems = this.containers.legend
            .append('ul')
            .classed('pvl-legend__ul', true)
            .selectAll('li.pvl-legend__li')
            .data(
                this.data.sets.legend.map(function(visit_status) {
                    return visit_status.split(':|:');
                })
            )
            .enter()
            .append('li')
            .classed('pvl-legend__li', true)
            .style({
                'border-bottom': function borderBottom(d) {
                    return '2px solid ' + (d[2] === 'black' ? '#ccc' : d[2]);
                },
                color: function color(d) {
                    return d[2];
                }
            });
        this.containers.legendItems.each(function(d) {
            var legendItem = d3.select(this);
            legendItem.append('span').classed('pvl-legend-item-label', true);
            legendItem
                .append('span')
                .classed('pvl-legend-item-info-icon', true)
                .html('&#9432')
                .style({
                    color: function color(d) {
                        return d[2];
                    }
                })
                .attr('title', function(d) {
                    return d[3];
                });
        });
        update.call(this);
    }

    function init(data) {
        this.data = {
            raw: data,
            filtered: data,
            variables: Object.keys(data[0]),
            missingVariables: [],
            sets: {},
            transposed: []
        };
        defineSets.call(this);
        defineColumns.call(this);
        transposeData.call(this);
        addLegend.call(this);
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
});
