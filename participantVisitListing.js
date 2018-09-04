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
        visit_status_col: 'visit_status',
        visit_status_order_col: 'status_order',
        visit_text_col: 'description',
        visit_text_color_col: 'description_color',
        date_format: '%d-%b-%y',
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
    this.styles = ['body {' + '    overflow-y: scroll;' + '}', '.participant-visit-listing {' + '    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;' + '    font-size: 16px;' + '    line-height: normal;' + '}', '.participant-visit-listing > * {' + '    width: 100%;' + '    display: inline-block;' + '}', '.pvl-controls {' + '    height: 5vh;' + '}', '.pvl-controls .wc-controls {' + '    float: right;' + '}', '.pvl-legend {' + '}', '.pvl-legend__ul {' + '    list-style-type: none;' + '    margin: 0;' + '    padding: 0;' + '    overflow: hidden;' + '}', '.pvl-legend__li {' + '    float: left;' + '    margin-right: 10px;' + '    width: 100px;' + '    text-align: center;' + '}', '.pvl-listing {' + '}', '.pvl-listing .wc-table {' + '    overflow: auto;' + '    height: 80vh;' + '}', '.pvl-listing .wc-table table {' + '    width: 100%;' + '    display: table;' + '}', '.pvl-listing .wc-table table thead {' + '    border: 2px solid black;' + '    outline: 2px solid black;' + '    background: #fff;' + '}', '.pvl-listing .wc-table table thead tr {' + '}', '.pvl-listing .wc-table table thead tr th {' + '}'];

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
    var _this = this;

    this.data.raw.forEach(function (d) {
        _this.parent.data.sets.visit_col.forEach(function (visit) {
            try {
                d[visit + "_date"] = d3.time.format(_this.config.date_format).parse(d[visit]);
            } catch (error) {
                d[visit + "_date"] = null;
            }
        });
    });
    this.data.initial = this.data.raw.slice();
}

function onLayout() {
    this.config.sortable = false;
}

function addHeaderHover() {
    //Highlight column when hovering over column header.
    this.thead.selectAll('th').on('mouseover', function (d, i) {
        var th = d3.select(this).style('outline', '1px solid black');
        d3.selectAll('tr td:nth-child(' + (i + 1) + ')').style('border-left', '1px solid black').style('border-right', '1px solid black');
    }).on('mouseout', function (d, i) {
        var th = d3.select(this).style('outline', 'none');
        d3.selectAll('tr td:nth-child(' + (i + 1) + ')').style('border-left', 'none').style('border-right', 'none');
    });
}

function floatHeader() {
    this.wrap.on('scroll', function () {
        var thead = this.querySelector('thead');
        thead.style.transform = 'translate(0,' + this.scrollTop + 'px)';
    });
}

function addCellFormatting() {
    this.tbody.selectAll('tr').each(function (d, i) {
        var row = d3.select(this);

        row.selectAll('td').each(function (di, j) {
            var cell = d3.select(this);

            //Add tooltip to cells.
            if (d[di.col] !== null) cell.attr('title', d.id + ' - ' + di.col + ': ' + d[di.col + '-status']);

            di.color = (d[di.col + '-color'] || 'white').toLowerCase();

            //Apply cell border coloring.
            if (!/white/.test(di.color)) cell.style('border-bottom', '2px solid ' + (di.color === 'black' ? '#ccc' : di.color));

            //Apply cell text coloring.
            if (!/black|white/.test(di.color)) cell.style('color', di.color);
        });
    });
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

function sortData(data) {
    var _this = this;

    this.data.raw = this.data.raw.sort(function (a, b) {
        var order = 0;

        _this.sortable.order.forEach(function (item) {
            var aCell = a[item.col + '_date'] ? a[item.col + '_date'] : a[item.col];
            console.log(aCell);
            console.log(typeof aCell === 'undefined' ? 'undefined' : _typeof(aCell));
            var bCell = b[item.col + '_date'] ? b[item.col + '_date'] : b[item.col];
            console.log(bCell);

            if (order === 0) {
                if (aCell !== null && bCell !== null) {
                    if (item.direction === 'ascending' && aCell < bCell || item.direction === 'descending' && aCell > bCell) order = -1;else if (item.direction === 'ascending' && aCell > bCell || item.direction === 'descending' && aCell < bCell) order = 1;
                } else if (aCell === null) order = 2;else if (bCell === null) order = -2;
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

function onDraw() {
    //Highlight column when hovering over column header.
    addHeaderHover.call(this);

    //Sort columns on click chronologically.
    sortChronologically.call(this);

    //Float table header as user scrolls.
    floatHeader.call(this);

    //Add data-driven cell formatting.
    addCellFormatting.call(this);
}

function onDestroy() {}

function listing() {
    //Define listing.
    this.listing = new webCharts.createTable(this.containers.listing.node(), this.settings.rendererSynced, this.controls);
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

    ['site_col', 'id_col', 'id_status_col', 'visit_col', // with visit_order_col
    'visit_status_col' // with visit_status_order_col and visit_text_color_col
    ].forEach(function (col) {
        switch (col) {
            case 'visit_col':
                _this.data.sets[col] = d3.set(_this.data.raw.map(function (d) {
                    return d[_this.settings.rendererSynced.visit_order_col] + ':|:' + d[_this.settings.rendererSynced.visit_col];
                })).values().sort(function (a, b) {
                    return a.split(':|:')[0] - b.split(':|:')[0];
                }).map(function (visit) {
                    return visit.split(':|:')[1];
                });
                break;
            case 'visit_status_col':
                _this.data.sets[col] = d3.set(_this.data.raw.map(function (d) {
                    return d[_this.settings.rendererSynced.visit_status_order_col] + ':|:' + d[_this.settings.rendererSynced.visit_status_col] + ':|:' + d[_this.settings.rendererSynced.visit_text_color_col].toLowerCase();
                })).values().sort(function (a, b) {
                    return +a.split(':|:')[0] - +b.split(':|:')[0];
                });
                break;
            default:
                _this.data.sets[col] = d3.set(_this.data.raw.map(function (d) {
                    return d[_this.settings.rendererSynced[col]];
                })).values().sort();
                break;
        }
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
            datum[visit] = visit_datum ? visit_datum[_this.settings.rendererSynced.visit_text_col] : null;
            datum[visit + '-status'] = visit_datum ? visit_datum[_this.settings.rendererSynced.visit_status_col] : null;
            datum[visit + '-color'] = visit_datum ? visit_datum[_this.settings.rendererSynced.visit_text_color_col] : null;
        });
        _this.data.transposed.push(datum);
    });
}

function addLegend() {
    this.containers.legend.append('ul').classed('pvl-legend__ul', true).selectAll('li.pvl-legend__li').data(this.data.sets.visit_status_col.map(function (visit_status) {
        return visit_status.split(':|:');
    })).enter().append('li').classed('pvl-legend__li', true).text(function (d) {
        return d[1];
    }).style({
        'border-bottom': function borderBottom(d) {
            return '2px solid ' + (d[2] === 'black' ? '#ccc' : d[2]);
        },
        'color': function color(d) {
            return d[2];
        }
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

})));
