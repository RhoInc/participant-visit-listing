(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.participantVisitListing = factory());
}(this, (function () { 'use strict';

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
            visit_day_col: 'visit_day',
            visit_status_col: 'visit_status',
            visit_status_order_col: 'visit_status_order',
            visit_text_col: 'visit_text',
            visit_status_color_col: 'visit_status_color', // must be hex RGB
            visit_status_description_col: 'visit_status_description',
            visit_expectation_pattern: '/expect|future|overdue/i',
            visit_exclusion_pattern: '/unscheduled|early termination|repeat/i',
            visit_status_exclusion_col: 'plot_exclude',
            visit_status_exclusion_value: 'Yes',

            //Miscellaneous
            filter_cols: ['subset1', 'subset2', 'subset3', 'overdue2'], // default filter variables
            display_cell_text: false,
            active_tab: 'Listing', // ['Listing', 'Charts']
            date_format: '%Y-%m-%d', // format of visit dates
            chart_margin: {
                top: 100,
                bottom: 100
            }
        };
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
                label: 'Participant Status',
                multiple: true
            }]
        };
    }

    function syncControlsSettings() {
        var listingSettings = this.settings.listingSynced;
        var controlsSettings = this.settings.controlsMerged;

        //Sync site filter.
        var siteFilter = controlsSettings.inputs.find(function (control) {
            return control.label === 'Site';
        });
        siteFilter.value_col = listingSettings.site_col;

        //Sync ID status filter.
        var idStatusFilter = controlsSettings.inputs.find(function (control) {
            return control.label === 'Participant Status';
        });
        idStatusFilter.value_col = listingSettings.id_status_col;

        //Add user-specified filters.
        if (Array.isArray(listingSettings.filter_cols) && listingSettings.filter_cols) {
            var labels = {
                subset1: 'Analysis Subset 1',
                subset2: 'Analysis Subset 2',
                subset3: 'Analysis Subset 3',
                overdue2: '>1 Overdue Visits'
            };
            listingSettings.filter_cols.forEach(function (filter_col) {
                controlsSettings.inputs.push({
                    type: 'subsetter',
                    label: labels[filter_col] || filter_col,
                    value_col: filter_col
                });
            });
        }
        listingSettings.filter_cols.splice(0, 0, siteFilter.value_col);
        listingSettings.filter_cols.splice(1, 0, idStatusFilter.value_col);

        this.settings.controlsSynced = controlsSettings;
        Object.assign(this.settings, controlsSettings);
    }

    function listingSettings() {
        var exports = ['csv'];
        var isBrowser = new Function('try {return this===window;}catch(e){ return false;}');
        if (isBrowser()) {
            if (window !== undefined && window.XLSX) exports.unshift('xlsx');
        }
        return {
            pagination: false, // turn off pagination to view all IDs at the same time
            exports: exports // default exports are to .xlsx and .csv
        };
    }

    function syncListingSettings() {
        var settings = this.settings.listingMerged;

        //Convert visit_expectation_pattern from string to regular expression.
        if (typeof settings.visit_expectation_pattern === 'string' && settings.visit_expectation_pattern !== '') {
            var flags = settings.visit_expectation_pattern.replace(/.*?\/([gimy]*)$/, '$1'); // capture regex flags from end of regex string
            var pattern = settings.visit_expectation_pattern.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1'); // capture regex pattern from beginning of regex string
            settings.visit_expectation_regex = new RegExp(pattern, flags);
        }

        //Convert visit_exclusion_pattern from string to regular expression.
        if (typeof settings.visit_exclusion_pattern === 'string' && settings.visit_exclusion_pattern !== '') {
            var _flags = settings.visit_exclusion_pattern.replace(/.*?\/([gimy]*)$/, '$1'); // capture regex flags from end of regex string
            var _pattern = settings.visit_exclusion_pattern.replace(new RegExp('^/(.*?)/' + _flags + '$'), '$1'); // capture regex pattern from beginning of regex string
            settings.visit_exclusion_regex = new RegExp(_pattern, _flags);
        }

        //Assign settings to settings object.
        this.settings.listingSynced = settings;
        Object.assign(this.settings, settings);
    }

    function commonChartSettings() {
        return {
            x: {
                type: null, // set in ./ordinalChartSettings and ./linearChartSettings.js
                label: null, // set in ./ordinalChartSettings.js and ./linearChartSettings.js
                value_col: null // set in ./ordinalChartSettings and ./syncLinearSettings.js
            },
            y: {
                type: 'ordinal',
                label: '',
                value_col: null, // set in ./syncOrdinalChartSettings and ./syncLinearChartSettings.js
                range_band: 15,
                behavior: 'flex'
            },
            marks: [{
                type: 'circle',
                per: null, // set in ./syncOrdinalChartSettings and ./syncLinearSettings.js
                tooltip: null, // set in ./syncOrdinalChartSettings and ./syncLinearSettings.js
                radius: 5,
                attributes: {
                    'fill-opacity': 1
                },
                values: {}
            }, {
                type: 'circle',
                per: null, // set in ./syncOrdinalChartSettings and ./syncOrdinalSettings.js
                tooltip: null, // set in ./syncOrdinalChartSettings and ./syncOrdinalSettings.js
                radius: 3,
                attributes: {
                    'fill-opacity': 1,
                    fill: 'white'
                },
                values: {
                    expected: [true]
                }
            }],
            color_by: null, // set in ./syncOrdinalChartSettings and ./syncLinearSettings.js
            color_dom: null, // set in ../init/defineSets/defineVisitStatusSet.js
            legend: {
                location: 'top',
                label: 'Visit Status',
                order: null // set in ../init/defineSets/defineVisitStatusSet.js
            },
            gridlines: 'y',
            padding: 0,
            scale_text: false
        };
    }

    function ordinalChartSettings() {
        var settings = commonChartSettings();
        settings.x.type = 'ordinal';
        settings.x.label = 'Visit';
        settings.marks[1].values.unscheduled = [false];

        return settings;
    }

    function syncOrdinalChartSettings() {
        var listingSettings = this.settings.listingSynced;
        var ordinalChartSettings = this.settings.ordinalChartMerged;
        ordinalChartSettings.margin = listingSettings.chart_margin;
        ordinalChartSettings.margin.right = ordinalChartSettings.margin.right || 40;

        //Update ordinal chart settings.
        ordinalChartSettings.x.column = listingSettings.visit_col;
        ordinalChartSettings.y.column = listingSettings.id_col;
        var circles = ordinalChartSettings.marks[0];
        circles.per = [listingSettings.id_col, listingSettings.visit_col];
        circles.tooltip = "[" + listingSettings.id_col + "] - [" + listingSettings.visit_col + "] ([" + listingSettings.visit_date_col + "]: Day [" + listingSettings.visit_day_col + "]): [" + listingSettings.visit_status_col + "]";
        var expectedCircles = ordinalChartSettings.marks[1];
        expectedCircles.per = [listingSettings.id_col, listingSettings.visit_col];
        expectedCircles.tooltip = "[" + listingSettings.id_col + "] - [" + listingSettings.visit_col + "] ([" + listingSettings.visit_date_col + "]: Day [" + listingSettings.visit_day_col + "]): [" + listingSettings.visit_status_col + "]";
        ordinalChartSettings.color_by = listingSettings.visit_status_col;

        //Assign settings to settings object.
        this.settings.ordinalChartSynced = ordinalChartSettings;
    }

    function linearChartSettings() {
        var settings = commonChartSettings();
        settings.x.type = 'linear';
        settings.x.label = 'Study Day';
        settings.marks.push({
            type: 'text',
            per: null, // set in ./syncLinearSettings.js
            tooltip: null, // set in ./syncLinearSettings.js
            text: '[visitCharacter]',
            attributes: {
                'font-size': '10px',
                'font-weight': 'bold',
                dx: 3,
                dy: -3,
                cursor: 'default'
            },
            values: {
                unscheduled: [true]
            }
        });

        return settings;
    }

    function syncLinearChartSettings() {
        var listingSettings = this.settings.listingSynced;
        var linearChartSettings = this.settings.linearChartMerged;
        linearChartSettings.margin = listingSettings.chart_margin;

        //Update linear chart settings.
        linearChartSettings.x.column = listingSettings.visit_day_col;
        linearChartSettings.y.column = listingSettings.id_col;
        var circles = linearChartSettings.marks[0];
        circles.per = [listingSettings.id_col, listingSettings.visit_day_col];
        circles.tooltip = "[" + listingSettings.id_col + "] - [" + listingSettings.visit_col + "] ([" + listingSettings.visit_date_col + "]: Day [" + listingSettings.visit_day_col + "]): [" + listingSettings.visit_status_col + "]";
        var expectedCircles = linearChartSettings.marks[1];
        expectedCircles.per = [listingSettings.id_col, listingSettings.visit_day_col];
        expectedCircles.tooltip = "[" + listingSettings.id_col + "] - [" + listingSettings.visit_col + "] ([" + listingSettings.visit_date_col + "]: Day [" + listingSettings.visit_day_col + "]): [" + listingSettings.visit_status_col + "]";
        var text = linearChartSettings.marks[2];
        text.per = [listingSettings.id_col, listingSettings.visit_day_col];
        text.tooltip = "[" + listingSettings.id_col + "] - [" + listingSettings.visit_col + "] ([" + listingSettings.visit_date_col + "]: Day [" + listingSettings.visit_day_col + "]): [" + listingSettings.visit_status_col + "]";
        linearChartSettings.color_by = listingSettings.visit_status_col;

        //Assign settings to settings object.
        this.settings.linearChartSynced = linearChartSettings;
    }

    var configuration = {
        rendererSettings: rendererSettings,
        controlsSettings: controlsSettings,
        syncControlsSettings: syncControlsSettings,
        listingSettings: listingSettings,
        syncListingSettings: syncListingSettings,
        ordinalChartSettings: ordinalChartSettings,
        syncOrdinalChartSettings: syncOrdinalChartSettings,
        linearChartSettings: linearChartSettings,
        syncLinearChartSettings: syncLinearChartSettings
    };

    function filterData(d, select) {
        var _this = this;

        var filter = this.data.filters.find(function (filter) {
            return filter.col === d.value_col;
        });
        filter.value = select.multiple ? d3.select(select).selectAll('option:checked').data() : select.value;

        //Apply analysis filters to raw data.
        this.data.analysis = this.data.raw;
        this.data.filters.filter(function (filter) {
            return (/^subset\d$/i.test(filter.col)
            );
        }).forEach(function (filter) {
            _this.data.analysis = _this.data.analysis.filter(function (di) {
                return Array.isArray(filter.value) ? filter.value.indexOf(di[filter.col]) > -1 : filter.value === 'All' || di[filter.col] === filter.value;
            });
        });

        //Apply other filters to analysis data.
        this.data.filtered = this.data.analysis;
        this.data.filters.filter(function (filter) {
            return !/^subset\d$/i.test(filter.col);
        }).forEach(function (filter) {
            _this.data.filtered = _this.data.filtered.filter(function (di) {
                return Array.isArray(filter.value) ? filter.value.indexOf(di[filter.col]) > -1 : filter.value === 'All' || di[filter.col] === filter.value;
            });
        });
    }

    function defineDefaultSet(col) {
        var _this = this;

        this.data.sets[col] = d3.set(this.data.filtered.map(function (d) {
            return d[_this.settings[col]];
        })).values().sort();
    }

    function defineVisitSet() {
        var _this = this;

        this.data.sets.visits = d3.set(this.data.analysis.map(function (d) {
            return d[_this.settings.visit_order_col] + ':|:' + d[_this.settings.visit_col];
        })).values();
        this.data.sets.visit_col = this.data.sets.visits.filter(function (visit) {
            return !_this.settings.visit_exclusion_regex.test(visit);
        }).sort(function (a, b) {
            return a.split(':|:')[0] - b.split(':|:')[0];
        }).map(function (visit) {
            return visit.split(':|:')[1];
        });
        this.data.sets.scheduledVisits = this.data.sets.visit_col;
        this.data.sets.unscheduledVisits = d3.set(this.data.sets.visits.filter(function (visit) {
            return _this.settings.visit_exclusion_regex.test(visit);
        }).sort(function (a, b) {
            return a.split(':|:')[0] - b.split(':|:')[0];
        }).map(function (order_visit) {
            var visit = order_visit.split(':|:')[1];
            var extra = visit.replace(_this.settings.visit_exclusion_regex, '');
            var yesPlease = visit.replace(extra, '');

            return yesPlease;
        })).values().sort();

        //Update ordinal chart settings.
        this.ordinalChart.config.x.domain = this.data.sets.visit_col;
        this.ordinalChart.config.marks[0].values[this.settings.visit_col] = this.data.sets.visit_col;
        this.ordinalChart.config.marks[1].values[this.settings.visit_col] = this.data.sets.visit_col;
    }

    function defineColumns() {
        this.listing.config.cols = ['Site', 'ID', 'Status'].concat(this.data.sets.visit_col);
        this.listing.config.headers = this.listing.config.cols.slice();
    }

    function transposeData() {
        var _this = this;

        this.data.transposed = [];

        this.data.sets.id_col.forEach(function (id, i) {
            var id_data = _this.data.raw.filter(function (d) {
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

            _this.data.sets.visit_col.forEach(function (visit) {
                var visit_datum = id_data.find(function (d) {
                    return d[_this.settings.visit_col] === visit;
                });
                datum[visit] = visit_datum ? visit_datum[_this.settings.visit_text_col] : '';
                datum[visit + '-date'] = visit_datum ? visit_datum[_this.settings.visit_date_col] : '';
                datum[visit + '-status'] = visit_datum ? visit_datum[_this.settings.visit_status_col] : '';
                datum[visit + '-color'] = visit_datum ? visit_datum[_this.settings.visit_status_color_col] : '';

                if (_this.data.missingVariables.subset1) datum['subset1'] = id_data[0]['subset1'];
                if (_this.data.missingVariables.subset2) datum['subset2'] = id_data[0]['subset2'];
                if (_this.data.missingVariables.subset3) datum['subset3'] = id_data[0]['subset3'];
            });
            _this.data.transposed.push(datum);
        });
    }

    function update() {
        var _this = this;

        var denominator = this.data.filtered.filter(function (d) {
            return _this.data.sets.legend.map(function (d) {
                return d.split(':|:')[1];
            }).indexOf(d[_this.settings.visit_status_col]) > -1;
        }).length;
        this.containers.legendItems.select('.pvl-legend-item-label').text(function (d) {
            var numerator = _this.data.filtered.filter(function (di) {
                return di[_this.settings.visit_status_col] === d[1];
            }).length;
            return d[1] + ' (' + (denominator > 0 ? d3.format('%')(numerator / denominator) : 'N/A') + ')';
        });
    }

    function update$1() {
        var context = this;

        //Capture all data filter dropdowns.
        var filters = this.controls.wrap.selectAll('.control-group').filter(function (d) {
            return d.type === 'subsetter';
        }).selectAll('select');

        //Remove extra 'All' options; not sure where they're coming from.
        filters.selectAll('option').filter(function (d) {
            return d === 'All';
        }).filter(function (d, i) {
            return i > 0;
        }).remove();

        //Redefine the event listener.
        filters.on('change', function (d) {
            filterData.call(context, d, this);
            defineDefaultSet.call(context, 'id_col');

            //Update visit set and listing columns if the changed filter controls an analysis subset.
            if (/^Analysis Subset \d$/.test(d.label)) {
                defineVisitSet.call(context);
                defineColumns.call(context);
            }

            transposeData.call(context);
            update.call(context);

            if (context.listing.initialized) context.listing.data.raw = context.data.transposed;
            if (context.ordinalChart.initialized) context.ordinalChart.raw_data = context.data.filtered;
            if (context.linearChart.initialized) context.linearChart.raw_data = context.data.filtered;

            //Redraw displays.
            if (context.settings.active_tab === 'Listing') {
                context.listing.draw();
            } else if (context.settings.active_tab === 'Charts') {
                context.ordinalChart.draw();
                context.linearChart.draw();
            }
        });
    }

    function updateSelects() {
        var context = this;

        this.controls.wrap.selectAll('.control-group').filter(function (d) {
            return !d.multiple;
        }).selectAll('select').each(function (d) {
            var filter = context.data.filters.find(function (filter) {
                return filter.col === d.value_col;
            });
            d3.select(this).selectAll('option').property('selected', function (d) {
                return filter.value === d;
            });
        });
    }

    function updateMultiSelects() {
        var context = this;

        this.controls.wrap.selectAll('.control-group').filter(function (d) {
            return d.multiple;
        }).selectAll('select').each(function (d) {
            var filter = context.data.filters.find(function (filter) {
                return filter.col === d.value_col;
            });
            var options = d3.select(this).attr('size', 2).selectAll('option');
            options.property('selected', function (d) {
                return filter.value === 'All' || filter.value.indexOf(d) > -1;
            });
        });
    }

    function addTabFunctionality() {
        var context = this;

        this.containers.tabs.on('click', function (d) {
            var t0 = performance.now();
            //begin performance test

            context.settings.active_tab = d;
            var tab = d3.select(this);
            var active = tab.classed('pvl-tab--active');

            if (!active) {
                context.containers.tabs.classed('pvl-tab--active', false);
                tab.classed('pvl-tab--active', true);
                context.containers.charts.classed('pvl-hidden', true);
                context.containers.listing.classed('pvl-hidden', true);
                context.containers[d.toLowerCase()].classed('pvl-hidden', false);

                if (d === 'Listing') {
                    //Initialize or draw listing.
                    if (context.listing.initialized) context.listing.draw(context.data.transposed);else {
                        context.listing.init(context.data.transposed);
                        update$1.call(context);
                        updateSelects.call(context);
                        updateMultiSelects.call(context);
                    }
                } else if (d === 'Charts') {
                    //Initialize or draw ordinal chart.
                    if (context.ordinalChart.initialized) context.ordinalChart.draw(context.data.filtered);else {
                        context.ordinalChart.init(context.data.filtered);
                    }

                    //Initialize or draw linear chart.
                    if (context.linearChart.initialized) context.linearChart.draw(context.data.filtered);else {
                        context.linearChart.init(context.data.filtered);
                        update$1.call(context);
                        updateSelects.call(context);
                        updateMultiSelects.call(context);
                    }
                }
            }

            //end performance test
            var t1 = performance.now();
            console.log('addTabFunctionality.click() took ' + (t1 - t0) + ' milliseconds.');
        });
    }

    function layout() {
        var _this = this;

        this.containers = {
            main: d3.select(this.element).append('div').datum(this).classed('participant-visit-listing', true).attr('id', 'participant-visit-listing' + (d3.selectAll('.participant-visit-listing').size() + 1))
        };

        /**-------------------------------------------------------------------------------------------\
          Upper row
        \-------------------------------------------------------------------------------------------**/

        this.containers.upperRow = this.containers.main.append('div').classed('pvl-row pvl-row--upper', true);
        this.containers.controls = this.containers.upperRow.append('div').classed('pvl-controls', true);
        this.containers.legend = this.containers.upperRow.append('div').classed('pvl-legend', true);

        /**-------------------------------------------------------------------------------------------\
          Lower row
        \-------------------------------------------------------------------------------------------**/

        this.containers.lowerRow = this.containers.main.append('div').classed('pvl-row pvl-row--lower', true);
        this.containers.tabContainer = this.containers.lowerRow.append('div').classed('pvl-tabs', true);
        this.containers.tabs = this.containers.tabContainer.selectAll('div').data(['Listing', 'Charts']).enter().append('div').attr('class', function (d) {
            return 'pvl-tab pvl-tab--' + d.toLowerCase() + ' ' + (d === _this.settings.active_tab ? 'pvl-tab--active' : '');
        }).text(function (d) {
            return d;
        });
        this.containers.charts = this.containers.lowerRow.append('div').classed('pvl-charts', true);
        this.containers.ordinalChart = this.containers.charts.append('div').classed('pvl-chart pvl-chart--ordinal', true);
        this.containers.linearChart = this.containers.charts.append('div').classed('pvl-chart pvl-chart--linear', true);
        this.containers.listing = this.containers.lowerRow.append('div').classed('pvl-listing', true);

        /**-------------------------------------------------------------------------------------------\
          Functionality
        \-------------------------------------------------------------------------------------------**/

        addTabFunctionality.call(this);
    }

    function styles() {
      this.styles = ['body {' + '}', '.participant-visit-listing {' + '    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;' + '    font-size: 16px;' + '    line-height: normal;' + '}', '.pvl-hidden {' + '    display: none !important;' + '}', '.participant-visit-listing > * {' + '    width: 100%;' + '    display: inline-block;' + '}',

      /***--------------------------------------------------------------------------------------\
        Upper row
      \--------------------------------------------------------------------------------------***/

      '.pvl-row--upper {' + '    padding-bottom: 12px;' + '}', '.pvl-row--upper > * {' + '    vertical-align: bottom;' + '    display: inline-block;' + '}',

      /****---------------------------------------------------------------------------------\
        Legend
      \---------------------------------------------------------------------------------****/

      '.pvl-legend {' + '    width: 35%;' + '    float: left;' + '}', '.pvl-legend__label {' + '    font-size: 24px;' + '    font-weight: lighter;' + '}', '.pvl-legend__ul {' + '    list-style-type: none;' + '    margin: 0;' + '    padding: 0;' + '    overflow: hidden;' + '}', '.pvl-legend__li {' + '    float: left;' + '    margin-right: 1%;' + '    text-align: center;' + '}', '.pvl-legend-item-info-icon {' + '    margin-left: 4px;' + '    font-weight: bold;' + '    cursor: help;' + '}',

      /****---------------------------------------------------------------------------------\
        Controls
      \---------------------------------------------------------------------------------****/

      '.pvl-controls {' + '    width: 64%;' + '    float: right;' + '}', '.pvl-controls .wc-controls {' + '    float: right;' + '    margin-bottom: 0;' + '    width: 100%;' + '}', '.pvl-controls .wc-controls .control-group {' + '    margin: 0 .8% 0 0;' + '    width: 16%;' + '}', '.pvl-controls .wc-controls .control-group:last-child {' + '    margin-right: 0;' + '}', '.pvl-controls .wc-controls .control-group:last-child {' + '    margin-right: 0;' + '}', '.pvl-controls .wc-controls .control-group > * {' + '    width: 100%;' + '}', '.pvl-controls .wc-controls .control-group .wc-control-label {' + '    margin-right: 5px;' + '    text-align: right;' + '    font-size: 14px;' + '}',

      /***--------------------------------------------------------------------------------------\
        Lower row
      \--------------------------------------------------------------------------------------***/

      '.pvl-row--lower {' + '}', '.pvl-row--lower > * {' + '}',

      /****---------------------------------------------------------------------------------\
        Tabs
      \---------------------------------------------------------------------------------****/

      '.pvl-tabs {' + '    text-align: center;' + '    border-top: 1px solid lightgray;' + '    border-bottom: 1px solid lightgray;' + '    padding: 6px 0;' + '}', '.pvl-tab {' + '    display: inline-block;' + '    border: 2px solid black;' + '    border-radius: 6px;' + '    padding: 1px 24px;' + '    font-size: 20px;' + '    margin: 0 2px;' + '    color: black;' + '    background: white;' + '    cursor: pointer;' + '    font-weight: normal;' + '}', '.pvl-tab--active {' + '    color: white;' + '    background: black;' + '    font-weight: bold;' + '    cursor: default;' + '}', '.pvl-tab:hover {' + '    color: white;' + '    background: black;' + '    font-weight: bold;' + '}',

      /****---------------------------------------------------------------------------------\
        Charts
      \---------------------------------------------------------------------------------****/

      '.pvl-charts {' + '    width: 100%;' + '    display: inline-block;' + '}', '.pvl-chart {' + '    display: inline-block;' + '}', '.pvl-chart--ordinal {' + '    width: 49.5%;' + '    float: left;' + '}', '.pvl-chart--linear {' + '    width: 49.5%;' + '    float: right;' + '}', '.pvl-chart .axis-title--top {' + '    font-size: 16px;' + '    font-weight: bold;' + '}' + '.pvl-chart .pvl-chart-button {' + '    font-size: 30px;' + '    cursor: pointer;' + '    fill: black;' + '}' + '.pvl-chart .pvl-chart-button:hover {' + '    fill: blue;' + '    stroke: blue;' + '}' + '.pvl-chart .pvl-chart-button--minimize {' + '}' + '.pvl-chart .pvl-chart-button--split {' + '    font-size: 24px;' + '}' + '.pvl-chart .pvl-chart-button--split:hover {' + '}' + '.pvl-chart .pvl-chart-button--maximize {' + '}' + '.pvl-unscheduled-legend-item,' + '.pvl-unscheduled-annotation {' + '    font-size: 14px;' + '    font-family: courier;' + '}',

      /****---------------------------------------------------------------------------------\
        Listing
      \---------------------------------------------------------------------------------****/

      '.pvl-listing {' + '}', '.pvl-listing .wc-table {' + '    width: 100%;' + '    overflow-x: scroll;' + '}', '.interactivity.pvl-cell-text-toggle {' + '    margin-right: 10px;' + '    border: 1px solid #aaa;' + '    border-radius: 5px;' + '    padding: 5px;' + '}', '.pvl-cell-text-toggle__label {' + '}', '.pvl-cell-text-toggle__checkbox {' + '    margin-left: 5px;' + '}', '.pvl-listing .wc-table table {' + '    display: table;' + '    border: 0;' + '    border-collapse: collapse;' + '    min-width: 100%;' + '}',

      /*****----------------------------------------------------------------------------\
        thead
      \----------------------------------------------------------------------------*****/

      '.pvl-listing .wc-table table thead {' + '}', '.pvl-listing .wc-table table thead tr:after {' + '    content: "";' + '    overflow-y: scroll;' + '    visibility: hidden;' + '    height: 0;' + '}', '.pvl-listing .wc-table table thead tr th {' + '    flex: 1 auto;' + '    display: block;' + '    border-top: 2px solid white;' + '}',

      /*****----------------------------------------------------------------------------\
        tbody
      \----------------------------------------------------------------------------*****/

      '.pvl-listing .wc-table table tbody {' + '    display: block;' + '    width: 100%;' + '    overflow-y: auto;' + '    height: 66vh;' + '}', '.pvl-listing .wc-table table tbody tr {' + '    background: white !important;' + '    border-bottom: 1px solid #eee;' + '}', '.pvl-listing .wc-table table tbody tr:hover {' + '    border-bottom: 1px solid black;' + '}', '.pvl-listing .wc-table table tbody tr td {' + '    cursor: default;' + '    flex: 1 auto;' + '    word-wrap: break-word;' + '}', '.pvl-listing .wc-table table tr td:nth-child(n+4) {' + '    border-right: 1px solid #aaa;' + '    border-left: 1px solid #aaa;' + '}', '.pvl-listing .wc-table table tbody tr td:nth-child(2) {' + '    cursor: help;' + '}', '.wc-table table tbody tr:nth-child(even) td:nth-child(-n+3) {' + '    background: #eee;' + '}', '.pvl-listing .wc-table table tbody tr td.pvl-emboldened {' + '    font-weight: bold;' + '}',

      /*****----------------------------------------------------------------------------\
        t-agnostic
      \----------------------------------------------------------------------------*****/

      '.pvl-listing .wc-table table tr {' + '    display: flex;' + '}', '.pvl-listing .wc-table table th,' + '.pvl-listing .wc-table table td {' + '    flex: 1 auto;' + '    width: 100px;' + '}'];

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

    function onInit() {
        this.initialized = true;
        this.data.initial = this.data.raw.slice();
        this.controls.init(this.pvl.data.raw); // gotta pass the raw data to the controls
    }

    function hideListing() {
        if (this.pvl.settings.active_tab !== 'Listing') this.pvl.containers.listing.classed('pvl-hidden', true);
    }

    function disableDefaultSorting() {
        this.config.sortable = false;
    }

    function toggleCellText() {
        var context = this;

        this.cellTextToggle = {
            container: this.wrap.selectAll('.table-top').insert('div', ':first-child').classed('interactivity pvl-cell-text-toggle', true)
        };
        this.cellTextToggle.label = this.cellTextToggle.container.append('label').classed('pvl-cell-text-toggle__label', true).text('Display cell text');
        this.cellTextToggle.checkbox = this.cellTextToggle.label.append('input').classed('pvl-cell-text-toggle__checkbox', true).attr('type', 'checkbox').property('checked', this.config.display_cell_text);
        this.cellTextToggle.checkbox.on('click', function () {
            context.config.display_cell_text = this.checked;
            context.draw();
        });
    }

    function addPDFExport() {
        if (window.jsPDF) this.exportable.wrap.insert('a', '#csv').classed('wc-button export', true).attr('id', 'pdf').text('PDF');
    }

    function onLayout() {
        hideListing.call(this);
        disableDefaultSorting.call(this);
        toggleCellText.call(this);
        addPDFExport.call(this);
    }

    function onPreprocess() {}

    function addHeaderHover() {
        //Highlight column when hovering over column header.
        this.thead.selectAll('th').on('mouseover', function (d, i) {
            d3.select(this).classed('pvl-header-hover', true);
            d3.selectAll('tr td:nth-child(' + (i + 1) + ')').classed('pvl-header-hover', true);
        }).on('mouseout', function (d, i) {
            d3.select(this).classed('pvl-header-hover', false);
            d3.selectAll('tr td:nth-child(' + (i + 1) + ')').classed('pvl-header-hover', false);
        });
    }

    function addCellFormatting() {
        var context = this;

        this.tbody.selectAll('tr').each(function (d, i) {
            var row = d3.select(this);

            row.selectAll('td:nth-child(n+4)').each(function (di, j) {
                var cell = d3.select(this).classed('pvl-emboldened', /\d\d/.test(di.text));
                di.date = d[di.col + '-date'];

                //Add tooltip to cells.
                if (d[di.col] !== null) cell.attr('title', d[context.pvl.settings.id_col] + ' - ' + di.col + ' (' + di.date + '): ' + d[di.col + '-status']);

                //Apply cell formmating.
                di.color = (d[di.col + '-color'] || 'white').toLowerCase();
                cell.style({
                    'border-top': '2px solid ' + (di.color === 'black' ? '#ccc' : di.color),
                    'border-bottom': '2px solid ' + (di.color === 'black' ? '#ccc' : di.color)
                }); // border-bottom
                if (context.config.display_cell_text) {
                    if (!/black|white/.test(di.color)) cell.style({
                        background: i % 2 ? '#eee' : 'white',
                        color: di.color
                    }); // color
                } else {
                    if (!/black|white/.test(di.color)) cell.style({
                        background: di.color,
                        opacity: 0.9
                    }); // color
                    cell.style('color', 'transparent');
                }
            });
        });
    }

    function participant() {
        var _this = this;

        // create dictionary of id columns
        var idDict = d3.nest().key(function (d) {
            return d[_this.pvl.settings.id_col];
        }).rollup(function (d) {
            return d;
        }).map(this.pvl.data.raw);

        // get all the cells
        var cells = this.table.selectAll('tbody tr').selectAll('td:nth-child(2)');

        // create ditionary of table cells
        var cellDict = cells.size() ? d3.nest().key(function (d) {
            return d[0].__data__.text;
        }).rollup(function (d) {
            return d[0];
        }).map(cells) : [];

        // get ids
        var id_cols = d3.set(this.data.raw.map(function (d) {
            return d[_this.pvl.settings.id_col];
        })).values();

        id_cols.forEach(function (id) {
            var id_data = idDict[id];
            var id_cell = cellDict[id];
            if (id_data && id_cell) {
                var id_summary = d3.nest().key(function (d) {
                    return d[_this.pvl.settings.visit_status_col];
                }).rollup(function (d) {
                    return d3.format('%')(d.length / id_data.length);
                }).entries(id_data);
                d3.select(id_cell[0]).attr('title', id_summary.map(function (status) {
                    return status.key + ' (' + status.values + ')';
                }).join('\n'));
            }
        });
    }

    function visit() {
        var _this = this;

        this.pvl.data.sets.visit_col.forEach(function (visit) {
            var visit_data = _this.pvl.data.raw.filter(function (d) {
                return d[_this.pvl.settings.visit_col] === visit;
            });
            var visit_summary = d3.nest().key(function (d) {
                return d[_this.pvl.settings.visit_status_col];
            }).rollup(function (d) {
                return d3.format('%')(d.length / visit_data.length);
            }).entries(visit_data);
            var visit_cell = _this.table.selectAll('thead tr').selectAll('th:not(:first-child)').filter(function (d) {
                return d === visit;
            });
            visit_cell.attr('title', visit_summary.map(function (status) {
                return status.key + ' (' + status.values + ')';
            }).join('\n'));
        });
    }

    function addSummaries() {
        participant.call(this);
        visit.call(this);
    }

    function sortData(data) {
        var _this = this;

        this.data.raw = this.data.raw.sort(function (a, b) {
            var order = 0;

            _this.sortable.order.forEach(function (item) {
                var aCell = a[item.col + '-date'] ? a[item.col + '-date'] : a[item.col];
                var bCell = b[item.col + '-date'] ? b[item.col + '-date'] : b[item.col];

                if (order === 0) {
                    if (aCell !== null && bCell !== null) {
                        if (item.direction === 'ascending' && aCell < bCell || item.direction === 'descending' && aCell > bCell) {
                            order = -1;
                        } else if (item.direction === 'ascending' && aCell > bCell || item.direction === 'descending' && aCell < bCell) {
                            order = 1;
                        }
                    } else if (['', null].indexOf(aCell) > -1) {
                        order = 2;
                    } else if (['', null].indexOf(bCell) > -1) {
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
        var sortItem = this.sortable.order.filter(function (item) {
            return item.col === col;
        })[0];

        //If it isn't, add it to sort order.
        if (!sortItem) {
            sortItem = {
                col: col,
                direction: 'ascending',
                wrap: this.sortable.wrap.append('div').datum({ key: col }).classed('wc-button sort-box', true).text(header)
            };
            sortItem.wrap.append('span').classed('sort-direction', true).html('&darr;');
            sortItem.wrap.append('span').classed('remove-sort', true).html('&#10060;');
            this.sortable.order.push(sortItem);
        } else {
            //Otherwise reverse its sort direction.
            sortItem.direction = sortItem.direction === 'ascending' ? 'descending' : 'ascending';
            sortItem.wrap.select('span.sort-direction').html(sortItem.direction === 'ascending' ? '&darr;' : '&uarr;');
        }

        //Hide sort instructions.
        this.sortable.wrap.select('.instruction').classed('hidden', true);

        //Add sort container deletion functionality.
        this.sortable.order.forEach(function (item, i) {
            item.wrap.on('click', function (d) {
                //Remove column's sort container.
                d3.select(this).remove();

                //Remove column from sort.
                context.sortable.order.splice(context.sortable.order.map(function (d) {
                    return d.col;
                }).indexOf(d.key), 1);

                //Display sorting instruction.
                context.sortable.wrap.select('.instruction').classed('hidden', context.sortable.order.length);

                //Redraw chart.
                if (context.sortable.order.length) sortData.call(context);else context.data.raw = context.data.initial.slice();
                context.draw();
            });
        });

        //Redraw chart.
        sortData.call(this);
        this.draw();
    }

    function sortChronologically() {
        var context = this;

        this.thead_cells.on('click', function (header) {
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

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function clone(obj) {
        var copy = void 0;

        //boolean, number, string, null, undefined
        if ('object' != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) || null == obj) return obj;

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

        var filterRange = 'A1:' + String.fromCharCode(64 + listing.config.cols.length) + (listing.data.filtered.length + 1);

        //Header row
        listing.config.headers.forEach(function (header, col) {
            addCell(wb, ws, header, 'c', clone(headerStyle), range, 0, col);
        });

        //Data rows
        listing.data.filtered.forEach(function (d, row) {
            listing.config.cols.forEach(function (variable, col) {
                var cellStyle = clone(bodyStyle);
                var color = d[variable + '-color'];
                var fontColor = /^#[a-z0-9]{6}$/i.test(color) ? color.replace('#', 'FF') : 'FF000000';
                var borderColor = /^#[a-z0-9]{6}$/i.test(color) ? color.replace('#', 'FF') : 'FFCCCCCC';
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
        var tr = listing.tbody.selectAll('tr')
        //.filter(function() {
        //    return d3.select(this).style('display') === 'table-row'; })
        .filter(function (d, i) {
            return i === 0;
        });
        tr.selectAll('td').each(function (d, i) {
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

    var saveAs = saveAs || function (view) {
        // IE <10 is explicitly unsupported

        if (typeof view === 'undefined' || typeof navigator !== 'undefined' && /MSIE [1-9]\./.test(navigator.userAgent)) {
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
            setImmediate(function () {
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
            if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
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
                if ((is_chrome_ios || force && is_safari) && view.FileReader) {
                    // Safari doesn't allow downloading of blob urls
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
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
                setImmediate(function () {
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
            return function (blob, name, no_auto_bom) {
                name = name || blob.name || 'download';

                if (!no_auto_bom) {
                    blob = auto_bom(blob);
                }
                return navigator.msSaveOrOpenBlob(blob, name);
            };
        }

        // todo: detect chrome extensions & packaged apps
        //save_link.target = "_blank";

        FS_proto.abort = function () {};
        FS_proto.readyState = FS_proto.INIT = 0;
        FS_proto.WRITING = 1;
        FS_proto.DONE = 2;

        FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;

        return saveAs;
    }(typeof self !== 'undefined' && self || typeof window !== 'undefined' && window);

    //Convert XLSX file for download.
    function s2ab(s) {
            var i = void 0;
            if (typeof ArrayBuffer !== 'undefined') {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);

                    for (i = 0; i !== s.length; ++i) {
                            view[i] = s.charCodeAt(i) & 0xff;
                    }return buf;
            } else {
                    var buf = new Array(s.length);

                    for (i = 0; i !== s.length; ++i) {
                            buf[i] = s.charCodeAt(i) & 0xff;
                    }return buf;
            }
    }

    function exportXLSX(listing) {
        try {
            saveAs(new Blob([s2ab(listing.XLSX)], { type: 'application/octet-stream' }), 'participant-visit-listing-' + d3.time.format('%Y-%m-%dT%H-%M-%S')(new Date()) + '.xlsx');
        } catch (error) {
            if (typeof console !== 'undefined') console.log(error);
        }
    }

    function exportToXLSX() {
        var _this = this;

        this.wrap.select('.export#xlsx').on('click', function () {
            defineXLSX(_this);
            exportXLSX(_this);
        });
    }

    function exportToPDF() {
        var _this = this;

        this.wrap.select('.export#pdf').on('click', function () {
            var doc = new jsPDF('l', 'pt');
            var tableNode = _this.table.node();
            var json = doc.autoTableHtmlToJson(tableNode);
            doc.autoTable(json.columns, json.data);
            doc.save('participant-visit-listing-' + d3.time.format('%Y-%m-%dT%H-%M-%S')(new Date()) + '.pdf');
        });
    }

    function download(fileType, data) {
        //transform blob array into a blob of characters
        var blob = new Blob(data, {
            type: fileType === 'csv' ? 'text/csv;charset=utf-8;' : fileType === 'xlsx' ? 'application/octet-stream' : console.warn('File type not supported: ' + fileType)
        });
        var fileName = 'participant-visit-listing-' + d3.time.format('%Y-%m-%dT%H-%M-%S')(new Date()) + '.' + fileType;
        var link = this.wrap.select('.export#' + fileType);

        if (navigator.msSaveBlob)
            //IE
            navigator.msSaveBlob(blob, fileName);else if (link.node().download !== undefined) {
            //21st century browsers
            var url = URL.createObjectURL(blob);
            link.node().setAttribute('href', url);
            link.node().setAttribute('download', fileName);
        }
    }

    function exportToCSV() {
        var _this = this;

        this.wrap.select('.export#csv').on('click', function () {
            var CSVarray = [];

            //add headers to CSV array
            var headers = _this.config.headers.map(function (header) {
                return '"' + header.replace(/"/g, '""') + '"';
            });
            CSVarray.push(headers);

            //add rows to CSV array
            _this.data.filtered.forEach(function (d, i) {
                var row = _this.config.cols.map(function (col) {
                    var value = d[col];

                    if (typeof value === 'string') value = value.replace(/"/g, '""');

                    return '"' + value + '"';
                });

                CSVarray.push(row);
            });

            //Download .csv file.
            download.call(_this, 'csv', [CSVarray.join('\n')]);
        });
    }

    function onDraw() {
        //Highlight column when hovering over column header.
        addHeaderHover.call(this);

        //Sort columns on click chronologically.
        sortChronologically.call(this);

        //Add row and column summaries.
        addSummaries.call(this);

        //Add data-driven cell formatting.
        addCellFormatting.call(this);

        //Add styled export to .xlsx.
        exportToXLSX.call(this);

        //Add styled (eventually) export to .pdf.
        exportToPDF.call(this);

        //Add export to .csv.
        exportToCSV.call(this);
    }

    function onDestroy() {}

    function listing() {
        //Define listing.
        this.listing = new webCharts.createTable(this.containers.listing.node(), this.settings.listingSynced, this.controls);
        this.listing.pvl = this;

        //Define callbacks.
        this.listing.on('init', onInit);
        this.listing.on('layout', onLayout);
        this.listing.on('preprocess', onPreprocess);
        this.listing.on('draw', onDraw);
        this.listing.on('destroy', onDestroy);
    }

    function onInit$1() {
        this.initialized = true;
        this.property = 'ordinalChart';
    }

    function addTopXAxis() {
        this.topXAxis = {
            container: this.svg.append('g').classed('x x--top axis ordinal', true)
        };
        this.topXAxis.label = this.topXAxis.container.append('text').classed('axis-title axis-title--top', true);
    }

    function minimize() {
        var thisChart = this.property;
        var thatChart = this.property === 'linearChart' ? 'ordinalChart' : 'linearChart';
        this.pvl.containers[thisChart].classed('pvl-hidden', true);
        this.pvl.containers[thatChart].classed('pvl-hidden', false).style('width', '100%');
        this.pvl[thatChart].draw();
    }

    function split() {
        this.pvl.containers.ordinalChart.classed('pvl-hidden', false).style('width', '49.5%');
        this.pvl.ordinalChart.draw();
        this.pvl.containers.linearChart.classed('pvl-hidden', false).style('width', '49.5%');
        this.pvl.linearChart.draw();
    }

    function maximize() {
        var thisChart = this.property;
        var thatChart = this.property === 'linearChart' ? 'ordinalChart' : 'linearChart';
        this.pvl.containers[thatChart].classed('pvl-hidden', true);
        this.pvl.containers[thisChart].classed('pvl-hidden', false).style('width', '100%');
        this.pvl[thisChart].draw();
    }

    function addButtons() {
        var _this = this;

        //Add minimize chart button.
        this.topXAxis.minimize = this.topXAxis.container.append('text').classed('pvl-chart-button pvl-chart-button--minimize', true).text('\u2212').on('click', function () {
            return minimize.call(_this);
        });
        this.topXAxis.minimize.append('title').text('MinimizeChart');

        //Add split chart button.
        this.topXAxis.split = this.topXAxis.container.append('text').classed('pvl-chart-button pvl-chart-button--split', true).text('\u25A1\u25A1').on('click', function () {
            return split.call(_this);
        });
        this.topXAxis.split.append('title').text('View both charts');

        //Add maximize chart button.
        this.topXAxis.maximize = this.topXAxis.container.append('text').classed('pvl-chart-button pvl-chart-button--maximize', true).text('+').on('click', function () {
            return maximize.call(_this);
        });
        this.topXAxis.maximize.append('title').text('Maximize Chart');
    }

    function onLayout$1() {
        addTopXAxis.call(this);
        addButtons.call(this);
        this.bottomXAxis = {
            container: this.svg.select('.x.axis').classed('x--bottom', true)
        };
    }

    function onPreprocess$1() {}

    function onDataTransform() {}

    function onDraw$1() {}

    function removeLegend() {
        this.legend.remove();
    }

    function drawTopXAxis() {
        //Draw top x-axis.
        this.topXAxis.axis = d3.svg.axis().scale(this.x).orient('top').ticks(this.xAxis.ticks()[0]).tickFormat(this.config.x_displayFormat).innerTickSize(this.xAxis.innerTickSize()).outerTickSize(this.xAxis.outerTickSize());
        this.topXAxis.container.call(this.topXAxis.axis);
        this.topXAxis.label.attr({
            transform: 'translate(' + this.plot_width / 2 + ',' + -(this.margin.top - 20) + ')',
            'text-anchor': 'middle'
        }).text('Schedule of Events by ' + this.config.x.label);
    }

    function positionButtons() {
        this.topXAxis.minimize.attr({
            transform: 'translate(' + (this.plot_width - 60) + ',' + -(this.margin.top - 24) + ')',
            'text-anchor': 'middle'
        });
        this.topXAxis.split.attr({
            transform: 'translate(' + (this.plot_width - 35) + ',' + -(this.margin.top - 18) + ')',
            'text-anchor': 'middle'
        });
        this.topXAxis.maximize.attr({
            transform: 'translate(' + (this.plot_width - 10) + ',' + -(this.margin.top - 24) + ')',
            'text-anchor': 'middle'
        });
    }

    function rotateXAxisTickLabels() {
        //Rotate top x-axis tick labels.
        this.topXAxis.container.selectAll('.tick text').attr('transform', 'rotate(-45)').style('text-anchor', 'start');

        //Rotate bottom x-axis tick labels.
        this.bottomXAxis.container.selectAll('.tick text').attr('transform', 'rotate(-45)').style('text-anchor', 'end');
    }

    function getItHeated() {
        var context = this;

        this.marks[0].groups.each(function (d) {
            var group = d3.select(this);
            group.select('rect.pvl-heat-rect').remove();
            d.heat = group.append('rect').classed('pvl-heat-rect', true).attr({
                x: context.x(d.values.x),
                y: context.y(d.values.y),
                width: context.x.rangeBand(),
                height: context.y.rangeBand(),
                fill: context.colorScale(d.values.raw[0][context.config.color_by]),
                stroke: '#aaa',
                'stroke-width': 0.5
            });
        });
    }

    function onResize() {
        removeLegend.call(this);
        drawTopXAxis.call(this);
        positionButtons.call(this);
        rotateXAxisTickLabels.call(this);
        getItHeated.call(this);
    }

    function onDestroy$1() {}

    function ordinalChart() {
        //Define listing.
        this.ordinalChart = new webCharts.createChart(this.containers.ordinalChart.node(), this.settings.ordinalChartSynced, this.controls);
        this.ordinalChart.pvl = this;

        //Define callbacks.
        this.ordinalChart.on('init', onInit$1);
        this.ordinalChart.on('layout', onLayout$1);
        this.ordinalChart.on('preprocess', onPreprocess$1);
        this.ordinalChart.on('datatransform', onDataTransform);
        this.ordinalChart.on('draw', onDraw$1);
        this.ordinalChart.on('resize', onResize);
        this.ordinalChart.on('destroy', onDestroy$1);
    }

    function onInit$2() {
        this.initialized = true;
        this.property = 'linearChart';
    }

    function onLayout$2() {
        addTopXAxis.call(this);
        addButtons.call(this);
        this.bottomXAxis = {
            container: this.svg.select('.x.axis').classed('x--bottom', true)
        };
        if (this.pvl.settings.active_tab !== 'Charts') this.pvl.containers.charts.classed('pvl-hidden', true);
    }

    function onPreprocess$2() {}

    function onDataTransform$1() {}

    function onDraw$2() {}

    function addAnnotationLegend() {
        var _this = this;

        if (this.pvl.data.sets.unscheduledVisits.length) this.pvl.data.sets.unscheduledVisits.forEach(function (visit, i) {
            _this.topXAxis.container.append('text').datum(visit).classed('pvl-unscheduled-legend-item', true).attr({
                transform: 'translate(-' + (_this.margin.left - 15) + ',' + (-_this.margin.top + 16 * (i + 1) + 3) + ')'
            }).text(visit.substring(0, 1) + ' - ' + visit + ' Visit');
        });
    }

    function classTextMarks() {
        this.marks.find(function (mark) {
            return mark.type === 'text';
        }).texts.classed('pvl-unscheduled-annotation', true);
    }

    function onResize$1() {
        removeLegend.call(this);
        drawTopXAxis.call(this);
        positionButtons.call(this);
        addAnnotationLegend.call(this);
        classTextMarks.call(this);
    }

    function onDestroy$2() {}

    function linearChart() {
        //Define listing.
        this.linearChart = new webCharts.createChart(this.containers.linearChart.node(), this.settings.linearChartSynced, this.controls);
        this.linearChart.pvl = this;

        //Define callbacks.
        this.linearChart.on('init', onInit$2);
        this.linearChart.on('layout', onLayout$2);
        this.linearChart.on('preprocess', onPreprocess$2);
        this.linearChart.on('datatransform', onDataTransform$1);
        this.linearChart.on('draw', onDraw$2);
        this.linearChart.on('resize', onResize$1);
        this.linearChart.on('destroy', onDestroy$2);
    }

    var charts = {
        ordinalChart: ordinalChart,
        linearChart: linearChart
    };

    function checkFilterCols(filterCol) {
        this.data.missingVariables[filterCol] = this.data.variables.indexOf(filterCol) > -1;
        if (!this.data.missingVariables[filterCol]) {
            this.settings.controlsSynced.inputs = this.settings.controlsSynced.inputs.filter(function (input) {
                return input.value_col !== filterCol;
            });
        } else {
            this.data.filters.push({
                col: filterCol,
                value: 'All'
            });
        }
    }

    function checkRequiredVariables() {
        var _this = this;

        this.settings.filter_cols.forEach(function (filter_col) {
            checkFilterCols.call(_this, filter_col);
        });
    }

    function addVariables() {
        var _this = this;

        this.data.raw.forEach(function (d) {
            d.visitDate = d[_this.settings.visit_date_col];
            d.visitCharacter = d[_this.settings.visit_col].substring(0, 1);
            d.expected = _this.settings.visit_expectation_regex.test(d[_this.settings.visit_status_col]);
            d.unscheduled = _this.settings.visit_exclusion_regex.test(d[_this.settings.visit_col]);
        });
    }

    function defineVisitStatusSet() {
        var _this = this;

        this.data.sets.visit_status_col = d3.set(this.data.raw.map(function (d) {
            return d[_this.settings.visit_status_order_col] + ':|:' + d[_this.settings.visit_status_col] + ':|:' + d[_this.settings.visit_status_color_col].toLowerCase() + ':|:' + d[_this.settings.visit_status_description_col];
        })).values().sort(function (a, b) {
            return +a.split(':|:')[0] - +b.split(':|:')[0];
        });

        //Update ordinal chart settings.
        this.ordinalChart.config.color_dom = this.data.sets.visit_status_col.map(function (visit_status) {
            return visit_status.split(':|:')[1];
        });
        this.ordinalChart.config.colors = this.data.sets.visit_status_col.map(function (visit_status) {
            return visit_status.split(':|:')[2];
        });
        this.ordinalChart.config.legend.order = this.data.sets.visit_status_col.map(function (visit_status) {
            return visit_status.split(':|:')[1];
        });

        //Update linear chart settings.
        this.linearChart.config.color_dom = this.data.sets.visit_status_col.map(function (visit_status) {
            return visit_status.split(':|:')[1];
        });
        this.linearChart.config.colors = this.data.sets.visit_status_col.map(function (visit_status) {
            return visit_status.split(':|:')[2];
        });
        this.linearChart.config.legend.order = this.data.sets.visit_status_col.map(function (visit_status) {
            return visit_status.split(':|:')[1];
        });
    }

    function defineLegendSet() {
        var _this = this;

        this.data.sets.legend = d3.set(this.data.raw.filter(function (d) {
            return d[_this.settings.visit_status_exclusion_col] !== _this.settings.visit_status_exclusion_value;
        }).map(function (d) {
            return d[_this.settings.visit_status_order_col] + ':|:' + d[_this.settings.visit_status_col] + ':|:' + d[_this.settings.visit_status_color_col].toLowerCase() + ':|:' + d[_this.settings.visit_status_description_col];
        })).values().sort(function (a, b) {
            return +a.split(':|:')[0] - +b.split(':|:')[0];
        });
    }

    function defineSets() {
        var _this = this;

        ['site_col', 'id_col', 'id_status_col', 'visit_col', // with visit_order_col
        'visit_status_col' // with visit_status_order_col, visit_status_color_col, and visit_status_description_col
        ].forEach(function (col) {
            switch (col) {
                case 'visit_col':
                    defineVisitSet.call(_this);
                    break;
                case 'visit_status_col':
                    defineVisitStatusSet.call(_this);
                    defineLegendSet.call(_this);
                    break;
                default:
                    defineDefaultSet.call(_this, col);
                    break;
            }
        });
    }

    function addLegend() {
        this.containers.legendLabel = this.containers.legend.append('span').classed('pvl-legend__label', true).text('Visit Status');
        this.containers.legendItems = this.containers.legend.append('ul').classed('pvl-legend__ul', true).selectAll('li.pvl-legend__li').data(this.data.sets.legend.map(function (visit_status) {
            return visit_status.split(':|:');
        })).enter().append('li').classed('pvl-legend__li', true).style({
            'border-bottom': function borderBottom(d) {
                return '2px solid ' + (d[2] === 'black' ? '#ccc' : d[2]);
            },
            color: function color(d) {
                return d[2];
            }
        });
        this.containers.legendItems.each(function (d) {
            var legendItem = d3.select(this);
            legendItem.append('span').classed('pvl-legend-item-label', true);
            legendItem.append('span').classed('pvl-legend-item-info-icon', true).html('&#9432').style({
                color: function color(d) {
                    return d[2];
                }
            }).attr('title', function (d) {
                return d[3];
            });
        });
        update.call(this);
    }

    function updateMultiSelects$1() {

        this.controls.wrap.selectAll('.control-group').filter(function (d) {
            return d.multiple;
        }).selectAll('select').attr('size', 2).selectAll('option').property('selected', true);
    }

    function init(data) {
        var t0 = performance.now();
        //begin performance test

        this.data = {
            raw: data,
            analysis: data,
            filtered: data,
            transposed: null,
            variables: Object.keys(data[0]),
            missingVariables: [],
            filters: [],
            sets: {}
        };
        checkRequiredVariables.call(this);
        addVariables.call(this);
        defineSets.call(this);
        defineColumns.call(this);
        transposeData.call(this);
        addLegend.call(this);
        if (this.settings.active_tab === 'Listing') {
            this.listing.init(this.data.transposed);
        } else if (this.settings.active_tab === 'Charts') {
            this.ordinalChart.init(this.data.raw);
            this.linearChart.init(this.data.raw);
        }
        updateMultiSelects$1.call(this);
        update$1.call(this);

        //end performance test
        var t1 = performance.now();
        console.log('participantVisitListing.init() took ' + (t1 - t0) + ' milliseconds.');
    }

    function participantVisitListing() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //Instantiate central object.
        var pvl = {
            element: element,
            settings: {
                user: settings,
                rendererSettings: configuration.rendererSettings(),
                controlsSettings: configuration.controlsSettings(),
                listingSettings: configuration.listingSettings(),
                ordinalChartSettings: configuration.ordinalChartSettings(),
                linearChartSettings: configuration.linearChartSettings()
            },
            init: init
        };

        //Merge and sync user settings with default settings.
        pvl.settings.listingMerged = Object.assign({}, pvl.settings.listingSettings, pvl.settings.rendererSettings, pvl.settings.user);
        configuration.syncListingSettings.call(pvl);

        pvl.settings.ordinalChartMerged = Object.assign({}, pvl.settings.ordinalChartSettings, pvl.settings.user);
        configuration.syncOrdinalChartSettings.call(pvl);

        pvl.settings.linearChartMerged = Object.assign({}, pvl.settings.linearChartSettings, pvl.settings.user);
        configuration.syncLinearChartSettings.call(pvl);

        pvl.settings.controlsMerged = Object.assign({}, pvl.settings.controlsSettings, pvl.settings.user);
        configuration.syncControlsSettings.call(pvl);

        layout.call(pvl); // attaches containers object to central object ([pvl])
        styles.call(pvl); // attaches styles object to central object ([pvl])
        controls.call(pvl); // attaches Webcharts controls object to central object ([pvl])
        listing.call(pvl); // attaches Webcharts table object to central object ([pvl])
        charts.ordinalChart.call(pvl); // attaches Webcharts chart object to central object ([pvl])
        charts.linearChart.call(pvl); // attaches Webcharts chart object to central object ([pvl])

        return pvl;
    }

    return participantVisitListing;

})));
