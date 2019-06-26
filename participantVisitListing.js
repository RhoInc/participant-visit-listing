(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('d3'), require('webcharts')))
        : typeof define === 'function' && define.amd
        ? define(['d3', 'webcharts'], factory)
        : ((global = global || self),
          (global.participantVisitListing = factory(global.d3, global.webCharts)));
})(this, function(d3, webcharts) {
    'use strict';

    function _typeof(obj) {
        if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof = function(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function(obj) {
                return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                    ? 'symbol'
                    : typeof obj;
            };
        }

        return _typeof(obj);
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            var ownKeys = Object.keys(source);

            if (typeof Object.getOwnPropertySymbols === 'function') {
                ownKeys = ownKeys.concat(
                    Object.getOwnPropertySymbols(source).filter(function(sym) {
                        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                    })
                );
            }

            ownKeys.forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        }

        return target;
    }

    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }

    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

            return arr2;
        }
    }

    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }

    function _iterableToArray(iter) {
        if (
            Symbol.iterator in Object(iter) ||
            Object.prototype.toString.call(iter) === '[object Arguments]'
        )
            return Array.from(iter);
    }

    function _iterableToArrayLimit(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i['return'] != null) _i['return']();
            } finally {
                if (_d) throw _e;
            }
        }

        return _arr;
    }

    function _nonIterableSpread() {
        throw new TypeError('Invalid attempt to spread non-iterable instance');
    }

    function _nonIterableRest() {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
    }

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

                var o = Object(this); // 2. Let len be ? ToLength(? Get(O, 'length')).

                var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.

                var thisArg = arguments[1]; // 5. Let k be 0.

                var k = 0; // 6. Repeat, while k < len

                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];

                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    } // e. Increase k by 1.

                    k++;
                } // 7. Return undefined.

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

                var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

                var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.

                var thisArg = arguments[1]; // 5. Let k be 0.

                var k = 0; // 6. Repeat, while k < len

                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];

                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    } // e. Increase k by 1.

                    k++;
                } // 7. Return -1.

                return -1;
            }
        });
    } //Symbol polyfill because babel does weird things with for-of loops

    !(function(global, factory) {
        'object' == (typeof module === 'undefined' ? 'undefined' : _typeof(module)) &&
        'object' == _typeof(module.exports)
            ? (module.exports = factory(global))
            : factory(global);
    })('undefined' != typeof window ? window : global, function(global) {
        var defineProperty = Object.defineProperty,
            defineProperties = Object.defineProperties,
            symbolHiddenCounter = 0,
            globalSymbolRegistry = [],
            slice = Array.prototype.slice,
            ES6 = 'object' == _typeof(global.ES6) ? global.ES6 : (global.ES6 = {}),
            isArray = Array.isArray,
            objectToString = Object.prototype.toString,
            push = Array.prototype.push,
            emptyFunction = function emptyFunction() {},
            simpleFunction = function simpleFunction(arg) {
                return arg;
            },
            isCallable = function isCallable(fn) {
                return 'function' == typeof fn;
            },
            Iterator = function Iterator() {},
            ArrayIterator = function ArrayIterator(array, flag) {
                (this._array = array), (this._flag = flag), (this._nextIndex = 0);
            },
            StringIterator = function StringIterator(string, flag) {
                (this._string = string), (this._flag = flag), (this._nextIndex = 0);
            },
            isObject = function isObject(value) {
                return null !== value && ('object' == _typeof(value) || 'function' == typeof value);
            },
            setupSymbolInternals = function setupSymbolInternals(symbol, desc) {
                return (
                    defineProperties(symbol, {
                        _description: {
                            value: desc
                        },
                        _isSymbol: {
                            value: !0
                        },
                        _id: {
                            value: symbolHiddenCounter++
                        }
                    }),
                    symbol
                );
            },
            appendArray = function appendArray(array1, array2) {
                if (
                    'number' == typeof array1.length &&
                    array1.length >= 0 &&
                    'number' == typeof array2.length &&
                    array2.length >= 0
                ) {
                    var length1 = Math.floor(array1.length),
                        length2 = Math.floor(array2.length),
                        i = 0;

                    for (array1.length = length1 + length2; i < length2; ++i) {
                        array2.hasOwnProperty(i) && (array1[length1 + i] = array2[i]);
                    }
                }
            },
            simpleInheritance = function simpleInheritance(child, parent) {
                if ('function' != typeof child || 'function' != typeof parent)
                    throw new TypeError('Child and Parent must be function type');
                (child.prototype = Object.create(parent.prototype)),
                    (child.prototype.constructor = child);
            },
            _Symbol = function _Symbol2(desc) {
                if (((desc = void 0 === desc ? '' : String(desc)), this instanceof _Symbol2))
                    throw new TypeError('Symbol is not a constructor');
                return setupSymbolInternals(Object.create(_Symbol2.prototype), desc);
            };

        defineProperties(_Symbol, {
            for: {
                value: function value(key) {
                    key = String(key);

                    for (
                        var record, registryLength = globalSymbolRegistry.length, i = 0;
                        i < registryLength;
                        ++i
                    ) {
                        if ((record = globalSymbolRegistry[i]).key === key) return record.symbol;
                    }

                    return (
                        (record = {
                            key: key,
                            symbol: _Symbol(key)
                        }),
                        globalSymbolRegistry.push(record),
                        record.symbol
                    );
                },
                writable: !0,
                configurable: !0
            },
            keyFor: {
                value: function value(symbol) {
                    if (!ES6.isSymbol(symbol))
                        throw new TypeError(String(symbol) + ' is not a symbol');

                    for (
                        var record, registryLength = globalSymbolRegistry.length, i = 0;
                        i < registryLength;
                        ++i
                    ) {
                        if ((record = globalSymbolRegistry[i]).symbol === symbol) return record.key;
                    }
                },
                writable: !0,
                configurable: !0
            },
            hasInstance: {
                value: _Symbol('Symbol.hasInstance')
            },
            isConcatSpreadable: {
                value: _Symbol('Symbol.isConcatSpreadable')
            },
            iterator: {
                value: _Symbol('Symbol.iterator')
            },
            toStringTag: {
                value: _Symbol('Symbol.toStringTag')
            }
        }),
            (_Symbol.prototype.toString = function() {
                return '@@_____' + this._id + '_____';
            }),
            (_Symbol.prototype.valueOf = function() {
                return this;
            }),
            defineProperty(Iterator.prototype, _Symbol.iterator.toString(), {
                value: function value() {
                    return this;
                },
                writable: !0,
                configurable: !0
            }),
            simpleInheritance(ArrayIterator, Iterator),
            simpleInheritance(StringIterator, Iterator),
            defineProperty(ArrayIterator.prototype, _Symbol.toStringTag.toString(), {
                value: 'Array Iterator',
                configurable: !0
            }),
            defineProperty(StringIterator.prototype, _Symbol.toStringTag.toString(), {
                value: 'String Iterator',
                configurable: !0
            }),
            (ArrayIterator.prototype.next = function() {
                if (!(this instanceof ArrayIterator))
                    throw new TypeError(
                        'Method Array Iterator.prototype.next called on incompatible receiver ' +
                            String(this)
                    );
                var nextValue;
                return -1 === this._nextIndex
                    ? {
                          done: !0,
                          value: void 0
                      }
                    : 'number' == typeof this._array.length &&
                      this._array.length >= 0 &&
                      this._nextIndex < Math.floor(this._array.length)
                    ? (1 === this._flag
                          ? (nextValue = [this._nextIndex, this._array[this._nextIndex]])
                          : 2 === this._flag
                          ? (nextValue = this._array[this._nextIndex])
                          : 3 === this._flag && (nextValue = this._nextIndex),
                      this._nextIndex++,
                      {
                          done: !1,
                          value: nextValue
                      })
                    : ((this._nextIndex = -1),
                      {
                          done: !0,
                          value: void 0
                      });
            }),
            (StringIterator.prototype.next = function() {
                if (!(this instanceof StringIterator))
                    throw new TypeError(
                        'Method String Iterator.prototype.next called on incompatible receiver ' +
                            String(this)
                    );
                var nextValue,
                    stringObject = new String(this._string);
                return -1 === this._nextIndex
                    ? {
                          done: !0,
                          value: void 0
                      }
                    : this._nextIndex < stringObject.length
                    ? ((nextValue = stringObject[this._nextIndex]),
                      this._nextIndex++,
                      {
                          done: !1,
                          value: nextValue
                      })
                    : ((this._nextIndex = -1),
                      {
                          done: !0,
                          value: void 0
                      });
            });

        var SpreadOperatorImpl = function SpreadOperatorImpl(target, thisArg) {
            (this._target = target), (this._values = []), (this._thisArg = thisArg);
        };

        (SpreadOperatorImpl.prototype.spread = function() {
            var self = this;
            return (
                slice.call(arguments).forEach(function(iterable) {
                    ES6.forOf(iterable, function(value) {
                        self._values.push(value);
                    });
                }),
                self
            );
        }),
            (SpreadOperatorImpl.prototype.add = function() {
                var self = this;
                return (
                    slice.call(arguments).forEach(function(value) {
                        self._values.push(value);
                    }),
                    self
                );
            }),
            (SpreadOperatorImpl.prototype.call = function(thisArg) {
                if ('function' != typeof this._target)
                    throw new TypeError('Target is not a function');
                return (
                    (thisArg = arguments.length <= 0 ? this._thisArg : thisArg),
                    this._target.apply(thisArg, this._values)
                );
            }),
            (SpreadOperatorImpl.prototype['new'] = function() {
                if ('function' != typeof this._target)
                    throw new TypeError('Target is not a constructor');
                var temp, returnValue;
                return (
                    (temp = Object.create(this._target.prototype)),
                    (returnValue = this._target.apply(temp, this._values)),
                    isObject(returnValue) ? returnValue : temp
                );
            }),
            (SpreadOperatorImpl.prototype.array = function() {
                if (!isArray(this._target)) throw new TypeError('Target is not a array');
                return push.apply(this._target, this._values), this._target;
            });
        return (
            defineProperties(ES6, {
                isSymbol: {
                    value: function value(symbol) {
                        return (
                            symbol instanceof _Symbol &&
                            (function(symbol) {
                                return (
                                    !0 === symbol._isSymbol &&
                                    'number' == typeof symbol._id &&
                                    'string' == typeof symbol._description
                                );
                            })(symbol)
                        );
                    },
                    writable: !0,
                    configurable: !0
                },
                instanceOf: {
                    value: function value(object, constructor) {
                        if (!isObject(constructor))
                            throw new TypeError("Right-hand side of 'instanceof' is not an object");
                        var hasInstanceSymbolProp = constructor[_Symbol.hasInstance];
                        if (void 0 === hasInstanceSymbolProp) return object instanceof constructor;
                        if ('function' != typeof hasInstanceSymbolProp)
                            throw new TypeError(
                                _typeof(hasInstanceSymbolProp) + ' is not a function'
                            );
                        return hasInstanceSymbolProp.call(constructor, object);
                    },
                    writable: !0,
                    configurable: !0
                },
                forOf: {
                    value: function value(iterable, callback, thisArg) {
                        if (
                            ((callback = 'function' != typeof callback ? emptyFunction : callback),
                            'function' != typeof iterable[_Symbol.iterator])
                        )
                            throw new TypeError('Iterable[Symbol.iterator] is not a function');

                        var iterationResult,
                            iterator = iterable[_Symbol.iterator]();

                        if ('function' != typeof iterator.next)
                            throw new TypeError('.iterator.next is not a function');

                        for (;;) {
                            if (((iterationResult = iterator.next()), !isObject(iterationResult)))
                                throw new TypeError(
                                    'Iterator result ' + iterationResult + ' is not an object'
                                );
                            if (iterationResult.done) break;
                            callback.call(thisArg, iterationResult.value);
                        }
                    },
                    writable: !0,
                    configurable: !0
                },
                spreadOperator: {
                    value: function value(target, thisArg) {
                        if ('function' != typeof target && !isArray(target))
                            throw new TypeError(
                                'Spread operator only supports on array and function objects at this moment'
                            );
                        return new SpreadOperatorImpl(target, thisArg);
                    },
                    writable: !0,
                    configurable: !0
                }
            }),
            defineProperty(global, 'Symbol', {
                value: _Symbol,
                writable: !0,
                configurable: !0
            }),
            defineProperty(Function.prototype, _Symbol.hasInstance.toString(), {
                value: function value(instance) {
                    return 'function' == typeof this && instance instanceof this;
                }
            }),
            defineProperty(Array.prototype, 'concat', {
                value: function value() {
                    if (void 0 === this || null === this)
                        throw new TypeError('Array.prototype.concat called on null or undefined');
                    var self = Object(this),
                        targets = slice.call(arguments),
                        outputs = [];
                    return (
                        targets.unshift(self),
                        targets.forEach(function(target) {
                            isObject(target)
                                ? void 0 !== target[_Symbol.isConcatSpreadable]
                                    ? target[_Symbol.isConcatSpreadable]
                                        ? appendArray(outputs, target)
                                        : outputs.push(target)
                                    : isArray(target)
                                    ? appendArray(outputs, target)
                                    : outputs.push(target)
                                : outputs.push(target);
                        }),
                        outputs
                    );
                },
                writable: !0,
                configurable: !0
            }),
            defineProperty(Object.prototype, 'toString', {
                value: function value() {
                    return void 0 === this || null === this
                        ? objectToString.call(this)
                        : 'string' == typeof this[_Symbol.toStringTag]
                        ? '[object ' + this[_Symbol.toStringTag] + ']'
                        : objectToString.call(this);
                },
                writable: !0,
                configurable: !0
            }),
            defineProperty(Array.prototype, _Symbol.iterator.toString(), {
                value: function value() {
                    if (void 0 === this || null === this)
                        throw new TypeError('Cannot convert undefined or null to object');
                    var self = Object(this);
                    return new ArrayIterator(self, 2);
                },
                writable: !0,
                configurable: !0
            }),
            defineProperty(Array, 'from', {
                value: function value(arrayLike, mapFn, thisArg) {
                    var constructor,
                        length,
                        outputs,
                        i = 0;
                    if (
                        ((constructor = isCallable(this) ? this : Array),
                        void 0 === arrayLike || null === arrayLike)
                    )
                        throw new TypeError('Cannot convert undefined or null to object');
                    if (((arrayLike = Object(arrayLike)), void 0 === mapFn)) mapFn = simpleFunction;
                    else if (!isCallable(mapFn)) throw new TypeError(mapFn + ' is not a function');

                    if (void 0 === arrayLike[_Symbol.iterator]) {
                        if (!('number' == typeof arrayLike.length && arrayLike.length >= 0))
                            return ((outputs = new constructor(0)).length = 0), outputs;

                        for (
                            length = Math.floor(arrayLike.length),
                                (outputs = new constructor(length)).length = length;
                            i < length;
                            ++i
                        ) {
                            outputs[i] = mapFn.call(thisArg, arrayLike[i]);
                        }
                    } else
                        ((outputs = new constructor()).length = 0),
                            ES6.forOf(arrayLike, function(value) {
                                outputs.length++,
                                    (outputs[outputs.length - 1] = mapFn.call(thisArg, value));
                            });

                    return outputs;
                },
                writable: !0,
                configurable: !0
            }),
            defineProperty(Array.prototype, 'entries', {
                value: function value() {
                    if (void 0 === this || null === this)
                        throw new TypeError('Cannot convert undefined or null to object');
                    var self = Object(this);
                    return new ArrayIterator(self, 1);
                },
                writable: !0,
                configurable: !0
            }),
            defineProperty(Array.prototype, 'keys', {
                value: function value() {
                    if (void 0 === this || null === this)
                        throw new TypeError('Cannot convert undefined or null to object');
                    var self = Object(this);
                    return new ArrayIterator(self, 3);
                },
                writable: !0,
                configurable: !0
            }),
            defineProperty(String.prototype, _Symbol.iterator.toString(), {
                value: function value() {
                    if (void 0 === this || null === this)
                        throw new TypeError(
                            'String.prototype[Symbol.iterator] called on null or undefined'
                        );
                    return new StringIterator(String(this), 0);
                },
                writable: !0,
                configurable: !0
            }),
            ES6
        );
    });

    function rendererSettings() {
        return {
            //ID-level variables
            site_col: 'site_name',
            id_col: 'subjectnameoridentifier',
            id_status_col: 'subject_status',
            //Visit-level variables
            visit_col: 'visit_name',
            visit_abbreviation_col: 'visit_abbreviation',
            visit_order_col: 'visit_number',
            visit_date_col: 'visit_date',
            visit_day_col: 'visit_day',
            visit_status_col: 'visit_status',
            visit_status_order_col: 'visit_status_order',
            visit_text_col: 'visit_text',
            visit_status_color_col: 'visit_status_color',
            // must be hex RGB
            visit_status_description_col: 'visit_status_description',
            visit_expectation_pattern: '/expect|future|overdue/i',
            visit_exclusion_pattern: '/unscheduled|early termination|repeat/i',
            visit_overdue_pattern: '/overdue/i',
            visit_status_exclusion_col: 'plot_exclude',
            visit_status_exclusion_value: 'Yes',
            //Miscellaneous
            filter_cols: ['subset1', 'subset2', 'subset3'],
            // default filter variables
            chart_layout: 'tabbed',
            // ['tabbed', 'side-by-side']
            active_tab: 'Visit Chart',
            // ['Visit Chart', 'Study Day Chart', 'Listing', 'Charts']
            abbreviate_visits: true,
            chart_margin: {
                top: 100,
                bottom: 100
            },
            display_cell_text: true,
            toggle_cell_text: false,
            date_format: '%Y-%m-%d' // format of visit dates
        };
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
                    label: 'Participant Status',
                    multiple: true
                },
                {
                    type: 'subsetter',
                    value_col: 'nOverdue',
                    label: '# of Overdue Visits'
                }
            ]
        };
    }

    function syncControlsSettings() {
        var listingSettings = this.settings.listingSynced;
        var controlsSettings = this.settings.controlsMerged; //Sync site filter.

        var siteFilter = controlsSettings.inputs.find(function(control) {
            return control.label === 'Site';
        });
        siteFilter.value_col = listingSettings.site_col; //Sync ID status filter.

        var idStatusFilter = controlsSettings.inputs.find(function(control) {
            return control.label === 'Participant Status';
        });
        idStatusFilter.value_col = listingSettings.id_status_col; //Add user-specified filters.

        if (Array.isArray(listingSettings.filter_cols) && listingSettings.filter_cols) {
            var labels = {
                subset1: 'Analysis Subset 1',
                subset2: 'Analysis Subset 2',
                subset3: 'Analysis Subset 3',
                overdue2: '>1 Overdue Visits'
            };
            listingSettings.filter_cols.forEach(function(filter_col) {
                controlsSettings.inputs.push({
                    type: 'subsetter',
                    label: labels[filter_col] || filter_col,
                    value_col: filter_col
                });
            });
        }

        this.settings.controlsSynced = controlsSettings;
    }

    function listingSettings() {
        var exports = ['csv'];
        var isBrowser = new Function('try {return this===window;}catch(e){ return false;}');

        if (isBrowser()) {
            if (window !== undefined && window.XLSX) exports.unshift('xlsx');
        }

        return {
            pagination: false,
            // turn off pagination to view all IDs at the same time
            exports: exports // default exports are to .xlsx and .csv
        };
    }

    function stringToRegExp(string) {
        var regex;

        if (typeof string === 'string' && string !== '') {
            var flags = string.replace(/.*?\/([gimy]*)$/, '$1'); // capture regex flags from end of regex string

            var pattern = string.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1'); // capture regex pattern from beginning of regex string

            regex = new RegExp(pattern, flags);
        } else regex = null;

        return regex;
    }

    function syncListingSettings() {
        var settings = this.settings.listingMerged; //Define regular expressions.

        settings.visit_expectation_regex = stringToRegExp(settings.visit_expectation_pattern);
        settings.visit_exclusion_regex = stringToRegExp(settings.visit_exclusion_pattern);
        settings.visit_overdue_regex = stringToRegExp(settings.visit_overdue_pattern); //Check filter_cols.

        settings.filter_cols = Array.isArray(settings.filter_cols) ? settings.filter_cols : []; //Check active_tab and chart_layout settings.

        if (['tabbed', 'side-by-side'].indexOf(settings.chart_layout) < 0) {
            console.warn(
                '[ chart_layout ] must be "tabbed" or "side-by-side", not "'.concat(
                    settings.chart_layout,
                    '". Defaulting to "tabbed".'
                )
            );
            settings.chart_layout = 'tabbed';
        }

        if (settings.chart_layout === 'tabbed') {
            if (['Visit Chart', 'Study Day Chart', 'Listing'].indexOf(settings.active_tab) < 0) {
                console.warn(
                    '[ active_tab ] must be "Visit Chart", "Study Day Chart", or "Listing", not "'.concat(
                        settings.active_tab,
                        '". Defaulting to "Visit Chart".'
                    )
                );
                settings.active_tab = 'Visit Chart';
            }
        } else if (settings.chart_layout === 'side-by-side') {
            if (['Charts', 'Listing'].indexOf(settings.active_tab) < 0) {
                console.warn(
                    '[ active_tab ] must be "Charts" or "Listing", not "'.concat(
                        settings.active_tab,
                        '". Defaulting to "Charts".'
                    )
                );
                settings.active_tab = 'Charts';
            }
        } //Assign settings to settings object.

        this.settings.listingSynced = settings;
        Object.assign(this.settings, settings);
    }

    function commonChartSettings() {
        return {
            x: {
                type: null,
                // set in ./ordinalChartSettings and ./linearChartSettings.js
                label: null,
                // set in ./ordinalChartSettings.js and ./linearChartSettings.js
                value_col: null // set in ./ordinalChartSettings and ./syncLinearSettings.js
            },
            y: {
                type: 'ordinal',
                label: '',
                value_col: null,
                // set in ./syncOrdinalChartSettings and ./syncLinearChartSettings.js
                range_band: 15,
                behavior: 'flex',
                sort: 'alphabetical-descending'
            },
            marks: [
                {
                    type: 'circle',
                    per: null,
                    // set in ./syncOrdinalChartSettings and ./syncLinearSettings.js
                    tooltip: null,
                    // set in ./syncOrdinalChartSettings and ./syncLinearSettings.js
                    radius: 5,
                    attributes: {
                        'fill-opacity': 1
                    },
                    values: {}
                },
                {
                    type: 'circle',
                    per: null,
                    // set in ./syncOrdinalChartSettings and ./syncOrdinalSettings.js
                    tooltip: null,
                    // set in ./syncOrdinalChartSettings and ./syncOrdinalSettings.js
                    radius: 4,
                    attributes: {
                        'fill-opacity': 1,
                        fill: 'white'
                    },
                    values: {
                        expected: [true]
                    }
                }
            ],
            color_by: null,
            // set in ./syncOrdinalChartSettings and ./syncLinearSettings.js
            color_dom: null,
            // set in ../init/defineSets/defineVisitStatusSet.js
            legend: {
                location: 'top',
                label: 'Visit Status',
                order: null // set in ../init/defineSets/defineVisitStatusSet.js
            },
            gridlines: 'xy',
            padding: 0,
            scale_text: false,
            resizable: false,
            margin: {},
            transitions: false
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
        var ordinalChartSettings = this.settings.ordinalChartMerged; //Update ordinal chart settings.

        ordinalChartSettings.x.column = listingSettings.visit_col;
        ordinalChartSettings.y.column = listingSettings.id_col;
        var circles = ordinalChartSettings.marks[0];
        circles.per = [listingSettings.id_col, listingSettings.visit_col];
        circles.tooltip = '['
            .concat(listingSettings.id_col, '] - [')
            .concat(listingSettings.visit_col, '] ([')
            .concat(listingSettings.visit_date_col, ']: Day [')
            .concat(listingSettings.visit_day_col, ']): [')
            .concat(listingSettings.visit_status_col, ']');
        var expectedCircles = ordinalChartSettings.marks[1];
        expectedCircles.per = [listingSettings.id_col, listingSettings.visit_col];
        expectedCircles.tooltip = '['
            .concat(listingSettings.id_col, '] - [')
            .concat(listingSettings.visit_col, '] ([')
            .concat(listingSettings.visit_date_col, ']: Day [')
            .concat(listingSettings.visit_day_col, ']): [')
            .concat(listingSettings.visit_status_col, ']');
        ordinalChartSettings.color_by = listingSettings.visit_status_col;
        ordinalChartSettings.gridlines = 'y';
        ordinalChartSettings.margin = Object.assign({}, listingSettings.chart_margin);
        ordinalChartSettings.margin.top = 0;
        ordinalChartSettings.margin.right = ordinalChartSettings.margin.right || 40; //Assign settings to settings object.

        this.settings.ordinalChartSynced = ordinalChartSettings;
    }

    function linearChartSettings() {
        var settings = commonChartSettings();
        settings.x.type = 'linear';
        settings.x.label = 'Study Day';
        settings.x.format = '1d';
        settings.marks.push({
            type: 'text',
            per: null,
            // set in ./syncLinearSettings.js
            tooltip: null,
            // set in ./syncLinearSettings.js
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
        var linearChartSettings = this.settings.linearChartMerged; //Update linear chart settings.

        linearChartSettings.x.column = listingSettings.visit_day_col;
        linearChartSettings.y.column = listingSettings.id_col;
        var circles = linearChartSettings.marks[0];
        circles.per = [listingSettings.id_col, listingSettings.visit_day_col];
        circles.tooltip = '['
            .concat(listingSettings.id_col, '] - [')
            .concat(listingSettings.visit_col, '] ([')
            .concat(listingSettings.visit_date_col, ']: Day [')
            .concat(listingSettings.visit_day_col, ']): [')
            .concat(listingSettings.visit_status_col, ']');
        var expectedCircles = linearChartSettings.marks[1];
        expectedCircles.per = [listingSettings.id_col, listingSettings.visit_day_col];
        expectedCircles.tooltip = '['
            .concat(listingSettings.id_col, '] - [')
            .concat(listingSettings.visit_col, '] ([')
            .concat(listingSettings.visit_date_col, ']: Day [')
            .concat(listingSettings.visit_day_col, ']): [')
            .concat(listingSettings.visit_status_col, ']');
        var text = linearChartSettings.marks[2];
        text.per = [listingSettings.id_col, listingSettings.visit_day_col];
        text.tooltip = '['
            .concat(listingSettings.id_col, '] - [')
            .concat(listingSettings.visit_col, '] ([')
            .concat(listingSettings.visit_date_col, ']: Day [')
            .concat(listingSettings.visit_day_col, ']): [')
            .concat(listingSettings.visit_status_col, ']');
        linearChartSettings.color_by = listingSettings.visit_status_col;
        linearChartSettings.margin = Object.assign({}, listingSettings.chart_margin);
        linearChartSettings.margin.top = 0; //Assign settings to settings object.

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

    var tabs = [
        {
            name: 'Visit Chart',
            class: 'visit-chart',
            property: 'ordinalChart'
        },
        {
            name: 'Study Day Chart',
            class: 'study-day-chart',
            property: 'linearChart'
        },
        {
            name: 'Charts',
            class: 'charts',
            property: 'charts'
        },
        {
            name: 'Listing',
            class: 'listing',
            property: 'listing'
        }
    ];

    function loading(event, callback) {
        var _this = this;

        var t0 = this.performance.now(); //begin performance test
        //indicate loading

        var html = this.document.getElementsByTagName('html')[0];
        if (!html.classList.contains('pvl-wait')) html.className += ' pvl-wait';
        var body = this.document.body;
        if (!body.classList.contains('pvl-wait')) body.className += ' pvl-wait';
        this.containers.loading.classed('pvl-hidden', false);
        var loading = setInterval(function() {
            var loadingIndicated = _this.containers.loading.style('display') !== 'none';

            if (loadingIndicated) {
                //Handle loading indicator.
                clearInterval(loading);

                _this.containers.loading.classed('pvl-hidden', true);

                html.className = html.className.replace(' pvl-wait', '');
                body.className = body.className.replace(' pvl-wait', ''); //Run callback.

                callback(); //end performance test

                var t1 = _this.performance.now();

                if (!_this.test)
                    console.log(''.concat(event, ' took ').concat(t1 - t0, ' milliseconds.'));
            }
        });
    }

    function idLevel() {
        var _this = this;

        //Derive ID-level variables.
        this.data.ids = d3
            .nest()
            .key(function(d) {
                return d[_this.settings.id_col];
            })
            .rollup(function(d) {
                var nOverdue = d.filter(function(di) {
                    return di.overdue;
                }).length;
                d.forEach(function(di) {
                    di.nOverdue = nOverdue.toString();
                });
                return d;
            })
            .map(this.data.analysis);
    }

    function updateNOverdueOptions() {
        //Define new set of nOverdue options with analysis data.
        var nOverdue = ['All'].concat(
            _toConsumableArray(
                d3
                    .set(
                        this.data.analysis.map(function(d) {
                            return d.nOverdue;
                        })
                    )
                    .values()
            )
        ); //Upate options in # of Overdue Visits dropdown.

        var nOverdueOptions = this.controls.wrap
            .selectAll('.control-group select')
            .filter(function(d) {
                return d.value_col === 'nOverdue';
            })
            .selectAll('option')
            .data(nOverdue);
        nOverdueOptions
            .enter()
            .append('option')
            .text(function(d) {
                return d;
            });
        nOverdueOptions.exit().remove(); //Update nOverdue filter if the currently selected option doesn't exist in the new set of nOverdue options.

        var nOverdueFilter = this.data.filters.find(function(filter) {
            return filter.col === 'nOverdue';
        });

        if (nOverdue.indexOf(nOverdueFilter.value) < 0) {
            nOverdueFilter.value = 'All';
            nOverdueOptions.property('selected', function(d) {
                return d === 'All';
            });
        }
    }

    function filterData(d, select) {
        var _this = this;

        if (d) {
            var filter = this.data.filters.find(function(filter) {
                return filter.col === d.value_col;
            });
            if (select)
                filter.value = select.multiple
                    ? d3
                          .select(select)
                          .selectAll('option:checked')
                          .data()
                    : select.value;
        } //Apply analysis filters to raw data.

        this.data.analysis = this.data.raw;
        this.data.filters
            .filter(function(filter) {
                return /^subset\d$/i.test(filter.col);
            })
            .forEach(function(filter) {
                _this.data.analysis = _this.data.analysis.filter(function(di) {
                    return Array.isArray(filter.value)
                        ? filter.value.indexOf(di[filter.col]) > -1
                        : filter.value === 'All' || di[filter.col] === filter.value;
                });
            }); //Derive ID-level variables on analysis data.

        idLevel.call(this); //Update options in # of Overdue Visits dropdown.

        updateNOverdueOptions.call(this); //Apply other filters to analysis data.

        this.data.filtered = this.data.analysis;
        this.data.filters
            .filter(function(filter) {
                return !/^subset\d$/i.test(filter.col);
            })
            .forEach(function(filter) {
                _this.data.filtered = _this.data.filtered.filter(function(di) {
                    return Array.isArray(filter.value)
                        ? filter.value.indexOf(di[filter.col]) > -1
                        : filter.value === 'All' || di[filter.col] === filter.value;
                });
            });
    }

    function defineDefaultSet(col) {
        var _this = this;

        this.data.sets[col] = d3
            .set(
                this.data.filtered.map(function(d) {
                    return d[_this.settings[col]];
                })
            )
            .values()
            .sort(); //Sort set numerically if possible.

        if (
            this.data.sets[col].every(function(value) {
                return !isNaN(parseFloat(value.replace(/[^0-9.]/g, '')));
            })
        )
            this.data.sets[col].sort(function(a, b) {
                return (
                    parseFloat(a.replace(/[^0-9.]/g, '')) - parseFloat(b.replace(/[^0-9.]/g, ''))
                );
            });
    }

    function defineVisitSet() {
        var _this = this;

        //visit order/name/abbreviation set
        this.data.sets.visit_col = d3
            .set(
                this.data.analysis.map(function(d) {
                    return ''
                        .concat(d[_this.settings.visit_order_col], ':|:')
                        .concat(d[_this.settings.visit_col], ':|:')
                        .concat(d[_this.settings.visit_abbreviation_col]);
                })
            )
            .values()
            .map(function(value) {
                var _value$split = value.split(':|:'),
                    _value$split2 = _slicedToArray(_value$split, 3),
                    order = _value$split2[0],
                    name = _value$split2[1],
                    abbreviation = _value$split2[2];

                return {
                    order: order,
                    name: name,
                    abbreviation: abbreviation
                };
            })
            .sort(function(a, b) {
                return a.order - b.order ? a.order - b.order : a.name < b.name ? -1 : 1;
            }); //scheduled visit set

        this.data.sets.scheduledVisits = this.data.sets.visit_col
            .filter(function(visit) {
                return _this.settings.visit_exclusion_regex
                    ? !_this.settings.visit_exclusion_regex.test(visit.name)
                    : true;
            })
            .map(function(visit) {
                return visit.name;
            }); //unscheduled visit set

        this.data.sets.unscheduledVisits = d3
            .set(
                this.data.sets.visit_col
                    .filter(function(visit) {
                        return _this.settings.visit_exclusion_regex
                            ? _this.settings.visit_exclusion_regex.test(visit.name)
                            : false;
                    })
                    .sort(function(a, b) {
                        return a.order - b.order;
                    })
                    .map(function(order_visit) {
                        var visit = order_visit.name;
                        var extra = visit.replace(_this.settings.visit_exclusion_regex, '');
                        var yesPlease = visit.replace(extra, '');
                        return yesPlease;
                    })
            )
            .values()
            .sort();
    }

    function transposeData() {
        var _this = this;

        this.data.transposed = new Array(this.data.sets.id_col.length);
        var i = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            var _loop = function _loop() {
                var _datum;

                var id = _step.value;

                var id_data = _this.data.raw.filter(function(d) {
                    return d[_this.settings.id_col] === id;
                });

                var datum = ((_datum = {}),
                _defineProperty(
                    _datum,
                    _this.settings.site_col,
                    id_data[0][_this.settings.site_col]
                ),
                _defineProperty(_datum, 'Site', id_data[0][_this.settings.site_col]),
                _defineProperty(_datum, _this.settings.id_col, id),
                _defineProperty(_datum, 'ID', id),
                _defineProperty(
                    _datum,
                    _this.settings.id_status_col,
                    id_data[0][_this.settings.id_status_col]
                ),
                _defineProperty(_datum, 'Status', id_data[0][_this.settings.id_status_col]),
                _defineProperty(_datum, 'nOverdue', id_data[0].nOverdue),
                _datum);
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    var _loop2 = function _loop2() {
                        var visit = _step2.value;
                        var visit_datum = id_data.find(function(d) {
                            return d[_this.settings.visit_col] === visit.name;
                        });
                        datum[visit.name] = visit_datum
                            ? visit_datum[_this.settings.visit_text_col]
                            : '';
                        datum[''.concat(visit.name, '-date')] = visit_datum
                            ? visit_datum[_this.settings.visit_date_col]
                            : '';
                        datum[''.concat(visit.name, '-status')] = visit_datum
                            ? visit_datum[_this.settings.visit_status_col]
                            : '';
                        datum[''.concat(visit.name, '-color')] = visit_datum
                            ? visit_datum[_this.settings.visit_status_color_col]
                            : '';
                        if (_this.data.missingVariables.subset1)
                            datum['subset1'] = id_data[0]['subset1'];
                        if (_this.data.missingVariables.subset2)
                            datum['subset2'] = id_data[0]['subset2'];
                        if (_this.data.missingVariables.subset3)
                            datum['subset3'] = id_data[0]['subset3'];
                    };

                    for (
                        var _iterator2 = _this.data.sets.visit_col[Symbol.iterator](), _step2;
                        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
                        _iteratorNormalCompletion2 = true
                    ) {
                        _loop2();
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2['return'] != null) {
                            _iterator2['return']();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                _this.data.transposed[i] = datum;
                i += 1;
            };

            for (
                var _iterator = this.data.sets.id_col[Symbol.iterator](), _step;
                !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                _iteratorNormalCompletion = true
            ) {
                _loop();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator['return'] != null) {
                    _iterator['return']();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
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
                return di[_this.settings.visit_status_col] === d[1];
            }).length;

            return ''
                .concat(d[1], ' (')
                .concat(denominator > 0 ? d3.format('%')(numerator / denominator) : 'N/A', ')');
        });
    }

    function updateNParticipants() {
        this.containers.nParticipants
            .select('.pvl-n-participants')
            .text(this.data.transposed.length);
    }

    function update$1() {
        var context = this; //Capture all data filter dropdowns.

        var filters = this.controls.wrap
            .selectAll('.control-group')
            .filter(function(d) {
                return d.type === 'subsetter';
            })
            .selectAll('select'); //Remove extra 'All' options; not sure where they're coming from.

        filters
            .selectAll('option')
            .filter(function(d) {
                return d === 'All';
            })
            .filter(function(d, i) {
                return i > 0;
            })
            .remove(); //Redefine the event listener.

        filters.on('change', function(d) {
            var _this = this;

            loading.call(context, ''.concat(d.label, ' filter change'), function() {
                filterData.call(context, d, _this);
                defineDefaultSet.call(context, 'id_col'); //Update visit set and listing columns if the changed filter controls an analysis subset.

                if (/^Analysis Subset \d$/.test(d.label)) {
                    defineVisitSet.call(context);
                }

                transposeData.call(context);
                update.call(context);
                updateNParticipants.call(context);

                if (context.listing.initialized) {
                    context.listing.data.initial = context.data.transposed;
                    context.listing.data.raw = context.data.transposed;
                }

                if (context.ordinalChart.initialized)
                    context.ordinalChart.raw_data = context.data.filtered;
                if (context.linearChart.initialized)
                    context.linearChart.raw_data = context.data.filtered; //Redraw displays.

                if (context.settings.active_tab === 'Listing') {
                    context.listing.draw();
                } else if (context.settings.active_tab === 'Charts') {
                    context.ordinalChart.draw();
                    context.linearChart.draw();
                } else if (context.settings.active_tab === 'Visit Chart') {
                    context.ordinalChart.draw();
                } else if (context.settings.active_tab === 'Study Day Chart') {
                    context.linearChart.draw();
                }
            });
        });
    }

    function updateSelects() {
        var context = this;
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(d) {
                return !d.multiple;
            })
            .selectAll('select')
            .each(function(d) {
                var filter = context.data.filters.find(function(filter) {
                    return filter.col === d.value_col;
                });
                d3.select(this)
                    .selectAll('option')
                    .property('selected', function(d) {
                        return filter.value === d;
                    });
            });
    }

    function updateMultiSelects() {
        var context = this;
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(d) {
                return d.multiple;
            })
            .selectAll('select')
            .each(function(d) {
                var filter = context.data.filters.find(function(filter) {
                    return filter.col === d.value_col;
                });
                var options = d3
                    .select(this)
                    .attr('size', 2)
                    .selectAll('option');
                options.property('selected', function(d) {
                    return filter.value === 'All' || filter.value.indexOf(d) > -1;
                });
            });
    }

    function addTabFunctionality() {
        var context = this;
        this.containers.tabs.on('click', function(d) {
            var _this = this;

            loading.call(context, 'this.containers.tabs.'.concat(d.property, ' click'), function() {
                context.settings.active_tab = d.name;
                var tab = d3.select(_this);
                var active = tab.classed('pvl-tab--active');

                if (!active) {
                    context.containers.tabs.classed('pvl-tab--active', false);
                    tab.classed('pvl-tab--active', true);

                    if (context.settings.chart_layout === 'tabbed') {
                        context.containers.ordinalChart.classed('pvl-hidden', true);
                        context.containers.linearChart.classed('pvl-hidden', true);
                    } else context.containers.charts.classed('pvl-hidden', true);

                    context.containers.listing.classed('pvl-hidden', true);
                    context.containers[d.property].classed('pvl-hidden', false);

                    if (d.name === 'Listing') {
                        //Initialize or draw listing.
                        if (context.listing.initialized)
                            context.listing.draw(context.data.transposed);
                        else {
                            context.listing.init(context.data.transposed, context.test);
                            update$1.call(context);
                            updateSelects.call(context);
                            updateMultiSelects.call(context);
                        }
                        context.containers.visitExpectationLegendContainer.classed(
                            'pvl-hidden',
                            true
                        );
                    } else if (d.name === 'Visit Chart') {
                        //Initialize or draw ordinal chart.
                        if (context.ordinalChart.initialized)
                            context.ordinalChart.draw(context.data.filtered);
                        else {
                            context.ordinalChart.init(context.data.filtered, context.test);
                            update$1.call(context);
                            updateSelects.call(context);
                            updateMultiSelects.call(context);
                        }
                        context.containers.visitExpectationLegendContainer.classed(
                            'pvl-hidden',
                            false
                        );
                        context.containers.visitExpectationLegend.past.rect.classed(
                            'pvl-hidden',
                            false
                        );
                        context.containers.visitExpectationLegend.future.rect.classed(
                            'pvl-hidden',
                            false
                        );
                    } else if (d.name === 'Study Day Chart') {
                        //Initialize or draw linear chart.
                        if (context.linearChart.initialized)
                            context.linearChart.draw(context.data.filtered);
                        else {
                            context.linearChart.init(context.data.filtered, context.test);
                            update$1.call(context);
                            updateSelects.call(context);
                            updateMultiSelects.call(context);
                        }
                        context.containers.visitExpectationLegendContainer.classed(
                            'pvl-hidden',
                            false
                        );
                        context.containers.visitExpectationLegend.past.rect.classed(
                            'pvl-hidden',
                            true
                        );
                        context.containers.visitExpectationLegend.future.rect.classed(
                            'pvl-hidden',
                            true
                        );
                    } else if (d.name === 'Charts') {
                        //Initialize or draw ordinal chart.
                        if (context.ordinalChart.initialized)
                            context.ordinalChart.draw(context.data.filtered);
                        else {
                            context.ordinalChart.init(context.data.filtered, context.test);
                        } //Initialize or draw linear chart.

                        if (context.linearChart.initialized)
                            context.linearChart.draw(context.data.filtered);
                        else {
                            context.linearChart.init(context.data.filtered, context.test);
                            update$1.call(context);
                            updateSelects.call(context);
                            updateMultiSelects.call(context);
                        }
                        context.containers.visitExpectationLegendContainer.classed(
                            'pvl-hidden',
                            false
                        );
                        context.containers.visitExpectationLegend.past.rect.classed(
                            'pvl-hidden',
                            context.containers.ordinalChart.classed('pvl-hidden')
                        );
                        context.containers.visitExpectationLegend.future.rect.classed(
                            'pvl-hidden',
                            context.containers.ordinalChart.classed('pvl-hidden')
                        );
                    }
                }
            });
        });
    }

    function layout() {
        var _this = this;
        this.containers = {
            main: d3
                .select(this.element)
                .append('div')
                .datum(this)
                .classed('participant-visit-listing', true)
                .attr(
                    'id',
                    'participant-visit-listing'.concat(
                        this.document.querySelectorAll('.participant-visit-listing').length
                    )
                )
        };
        /**-------------------------------------------------------------------------------------------\
      Upper row
    \-------------------------------------------------------------------------------------------**/

        this.containers.upperRow = this.containers.main
            .append('div')
            .classed('pvl-row pvl-row--upper', true);
        this.containers.controls = this.containers.upperRow
            .append('div')
            .classed('pvl-controls', true);
        this.containers.legend = this.containers.upperRow.append('div').classed('pvl-legend', true);
        /**-------------------------------------------------------------------------------------------\
      Lower row
    \-------------------------------------------------------------------------------------------**/

        this.containers.lowerRow = this.containers.main
            .append('div')
            .classed('pvl-row pvl-row--lower', true); //tabs

        var selectedTabs = tabs.filter(function(tab) {
            return _this.settings.chart_layout === 'tabbed'
                ? tab.name !== 'Charts'
                : _this.settings.chart_layout === 'side-by-side'
                ? ['Visit Chart', 'Study Day Chart'].indexOf(tab.name) < 0
                : true;
        });
        this.containers.tabContainer = this.containers.lowerRow
            .append('div')
            .classed('pvl-tabs', true);
        this.containers.visitExpectationLegendContainer = this.containers.tabContainer
            .append('div')
            .classed('pvl-visit-expectation-legend pvl-hidden', true);
        this.containers.nParticipants = this.containers.tabContainer
            .append('div')
            .classed('pvl-viewing-n-participants', true)
            .html('Viewing <span class = "pvl-n-participants"></span> participants.');
        this.containers.loading = this.containers.tabContainer
            .append('div')
            .classed('pvl-hidden pvl-loading', true);
        this.containers.loading
            .selectAll('div.pvl-loading-ball')
            .data([1, 2, 3])
            .enter()
            .append('div')
            .attr('class', function(d) {
                return 'pvl-loading-ball pvl-loading-ball--'.concat(d);
            });
        this.containers.tabs = this.containers.tabContainer
            .selectAll('div.pvl-tab')
            .data(selectedTabs)
            .enter()
            .append('div')
            .attr('class', function(d) {
                return 'pvl-tab pvl-tab--'
                    .concat(d['class'], ' ')
                    .concat(d.name === _this.settings.active_tab ? 'pvl-tab--active' : '');
            })
            .text(function(d) {
                return d.name;
            }); //display containers

        if (this.settings.chart_layout === 'tabbed') {
            this.containers.ordinalChart = this.containers.lowerRow
                .append('div')
                .classed('pvl-display pvl-chart pvl-chart--ordinal pvl-chart--full', true);
            this.containers.linearChart = this.containers.lowerRow
                .append('div')
                .classed('pvl-display pvl-chart pvl-chart--linear pvl-chart--full', true);
        } else {
            this.containers.charts = this.containers.lowerRow
                .append('div')
                .classed('pvl-charts', true);
            this.containers.ordinalChart = this.containers.charts
                .append('div')
                .classed('pvl-display pvl-chart pvl-chart--ordinal pvl-chart--side-by-side', true);
            this.containers.linearChart = this.containers.charts
                .append('div')
                .classed('pvl-display pvl-chart pvl-chart--linear pvl-chart--side-by-side', true);
        }

        this.containers.listing = this.containers.lowerRow
            .append('div')
            .classed('pvl-display pvl-listing', true);
        /**-------------------------------------------------------------------------------------------\
      Functionality
    \-------------------------------------------------------------------------------------------**/

        addTabFunctionality.call(this);
    }

    function styles() {
        this.styles = [
            'html.pvl-wait, html.pvl-wait * {' + '    cursor: wait !important;' + '}',
            'body.pvl-wait, body.pvl-wait * {' + '    cursor: wait !important;' + '}',
            '.participant-visit-listing {' +
                '    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;' +
                '    font-size: 16px;' +
                '    line-height: normal;' +
                '}',
            '.pvl-hidden {' + '    display: none !important;' + '}',
            '.participant-visit-listing > * {' +
                '    width: 100%;' +
                '    display: inline-block;' +
                '}',
            /***--------------------------------------------------------------------------------------\
      Upper row
    \--------------------------------------------------------------------------------------***/
            '.pvl-row--upper {' + '    padding-bottom: 12px;' + '}',
            '.pvl-row--upper > * {' +
                '    vertical-align: bottom;' +
                '    display: inline-block;' +
                '}',
            /****---------------------------------------------------------------------------------\
      Legend
    \---------------------------------------------------------------------------------****/
            '.pvl-legend {' + '    width: 35%;' + '    float: left;' + '}',
            '.pvl-legend__label {' + '    font-size: 24px;' + '    font-weight: lighter;' + '}',
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
            '.pvl-controls {' + '    width: 64%;' + '    float: right;' + '}',
            '.pvl-controls .wc-controls {' +
                '    float: right;' +
                '    margin-bottom: 0;' +
                '    width: 100%;' +
                '}',
            '.pvl-controls .wc-controls .control-group {' +
                '    margin: 0 .8% 0 0;' +
                '    width: 16%;' +
                '}',
            '.pvl-controls .wc-controls .control-group:last-child {' + '    margin-right: 0;' + '}',
            '.pvl-controls .wc-controls .control-group:last-child {' + '    margin-right: 0;' + '}',
            '.pvl-controls .wc-controls .control-group > * {' + '    width: 100%;' + '}',
            '.pvl-controls .wc-controls .control-group .wc-control-label {' +
                '    margin-right: 5px;' +
                '    text-align: right;' +
                '    font-size: 14px;' +
                '}',
            /***--------------------------------------------------------------------------------------\
      Lower row
    \--------------------------------------------------------------------------------------***/
            '.pvl-row--lower {' + '}',
            '.pvl-row--lower > * {' + '}',
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
            '.pvl-visit-expectation-legend {' +
                '    display: inline-block;' +
                '    position: absolute;' +
                '    top: 0;' +
                '    left: 0;' +
                '}',
            '.pvl-viewing-n-participants {' +
                '    display: inline-block;' +
                '    position: absolute;' +
                '    bottom: 0;' +
                '    right: 0;' +
                '}',
            '.pvl-n-participants {' + '    font-weight: bold;' + '}',
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
            '.pvl-charts {' + '    width: 100%;' + '    display: inline-block;' + '}',
            '.pvl-chart {' + '    display: inline-block;' + '    width: 100%;' + '}',
            '.pvl-charts .pvl-chart--ordinal {' + '    width: 49.5%;' + '    float: left;' + '}',
            '.pvl-charts .pvl-chart--linear {' + '    width: 49.5%;' + '    float: right;' + '}',
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
                '.pvl-chart--ordinal .x.axis .tick {' +
                '    cursor: help;' +
                '}',
            '.pvl-unscheduled-legend-item,' +
                '.pvl-unscheduled-annotation {' +
                '    font-size: 14px;' +
                '    font-family: courier;' +
                '}',
            '.pvl-chart--linear .wc-data-mark {' + '    cursor: pointer;' + '}',
            '.pvl-chart--linear .pvl-highlighted-visit-mark {' + '    cursor: pointer;' + '}',
            /****---------------------------------------------------------------------------------\
      Listing
    \---------------------------------------------------------------------------------****/
            '.pvl-listing {' + '}',
            '.pvl-listing .pvl-scroll-bar--outer {' +
                '    width: 100%;' +
                '    overflow-x: auto;' +
                '    overflow-y: hidden;' +
                '}',
            '.pvl-listing .pvl-scroll-bar--upper {' + '    height: 20px;' + '}',
            '.pvl-listing .wc-table {' + '    overflow: none;' + '}',
            '.interactivity.pvl-cell-text-toggle {' +
                '    margin-right: 10px;' +
                '    border: 1px solid #aaa;' +
                '    border-radius: 5px;' +
                '    padding: 5px;' +
                '}',
            '.pvl-cell-text-toggle__label {' + '}',
            '.pvl-cell-text-toggle__checkbox {' + '    margin-left: 5px;' + '}',
            '.pvl-listing .wc-table table {' +
                '    display: table;' +
                '    border: 0;' +
                '    border-collapse: collapse;' +
                '    min-width: 100%;' +
                '}',
            /*****----------------------------------------------------------------------------\
      thead
    \----------------------------------------------------------------------------*****/
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
            '.pvl-listing .wc-table table tbody tr td:nth-child(2) {' + '    cursor: help;' + '}',
            '.wc-table table tbody tr:nth-child(even) td:nth-child(-n+3) {' +
                '    background: #eee;' +
                '}',
            '.pvl-listing .wc-table table tbody tr td.pvl-emboldened {' +
                '    font-weight: bold;' +
                '}',
            /*****----------------------------------------------------------------------------\
      t-agnostic
    \----------------------------------------------------------------------------*****/
            '.pvl-listing .wc-table table tr {' + '    display: flex;' + '}',
            '.pvl-listing .wc-table table th,' +
                '.pvl-listing .wc-table table td {' +
                '    flex: 1 auto;' +
                '    width: 100px;' +
                '}'
        ]; //Attach styles to DOM.

        this.style = this.document.createElement('style');
        this.style.type = 'text/css';
        this.style.innerHTML = this.styles.join('\n');
        this.document.getElementsByTagName('head')[0].appendChild(this.style);
        this.containers.style = d3.select(this.style);
    }

    function controls() {
        this.controls = new webcharts.createControls(
            this.containers.controls.node(),
            this.settings.controlsSynced
        );
    }

    function defineColumns() {
        this.config.cols = this.display_dates
            ? ['Site', 'ID', 'Status'].concat(
                  this.pvl.data.sets.scheduledVisits.map(function(visit) {
                      return ''.concat(visit, '-date');
                  })
              )
            : ['Site', 'ID', 'Status'].concat(this.pvl.data.sets.scheduledVisits);
        this.config.headers = this.config.cols.slice().map(function(col) {
            return col.replace('-date', '');
        });
    }

    function onInit() {
        this.initialized = true;
        this.data.initial = this.data.raw.slice();
        this.controls.init(this.pvl.data.raw); // gotta pass the raw data to the controls

        defineColumns.call(this);
    }

    function hideListing() {
        if (this.pvl.settings.active_tab !== 'Listing')
            this.pvl.containers.listing.classed('pvl-hidden', true);
    }

    function addTopScrollBar() {
        this.scrollBars = {};
        this.scrollBars.upper_outer = this.pvl.containers.listing
            .insert('div', ':first-child')
            .classed('pvl-scroll-bar pvl-scroll-bar--upper pvl-scroll-bar--outer', true);
        this.scrollBars.upper_inner = this.scrollBars.upper_outer
            .append('div')
            .classed('pvl-scroll-bar pvl-scroll-bar--upper pvl-scroll-bar--inner', true);
        this.scrollBars.lower_outer = this.pvl.containers.listing
            .insert('div', '.wc-chart')
            .classed('pvl-scroll-bar pvl-scroll-bar--lower pvl-scroll-bar--outer', true);
        this.scrollBars.lower_inner = this.wrap.classed(
            'pvl-scroll-bar pvl-scroll-bar--lower pvl-scroll-bar--inner',
            true
        );
        this.scrollBars.lower_outer.node().appendChild(this.scrollBars.lower_inner.node());
    }

    function disableDefaultSorting() {
        this.config.sortable = false;
    }

    function toggleCellText() {
        if (this.pvl.settings.toggle_cell_text) {
            var context = this;
            this.cellTextToggle = {
                container: this.wrap
                    .selectAll('.table-top')
                    .insert('div', ':first-child')
                    .classed('interactivity pvl-cell-text-toggle', true)
            };
            this.cellTextToggle.label = this.cellTextToggle.container
                .append('label')
                .classed('pvl-cell-text-toggle__label', true)
                .text('Display cell text');
            this.cellTextToggle.checkbox = this.cellTextToggle.label
                .append('input')
                .classed('pvl-cell-text-toggle__checkbox', true)
                .attr('type', 'checkbox')
                .property('checked', this.config.display_cell_text);
            this.cellTextToggle.checkbox.on('click', function() {
                context.config.display_cell_text = this.checked;
                context.draw();
            });
        }
    }

    function toggleVisitDates() {
        var context = this;
        this.display_dates = false;
        this.cellVisitDatesToggle = {
            container: this.wrap
                .selectAll('.table-top')
                .insert('div', ':first-child')
                .classed('interactivity pvl-cell-text-toggle', true)
        };
        this.cellVisitDatesToggle.label = this.cellVisitDatesToggle.container
            .append('label')
            .classed('pvl-cell-text-toggle__label', true)
            .text('Display visit dates');
        this.cellVisitDatesToggle.checkbox = this.cellVisitDatesToggle.label
            .append('input')
            .classed('pvl-cell-text-toggle__checkbox', true)
            .attr('type', 'checkbox')
            .property('checked', false);
        this.cellVisitDatesToggle.checkbox.on('click', function() {
            context.display_dates = this.checked;
            context.draw();
        });
    }

    function addPDFExport() {
        if (window.jsPDF)
            this.exportable.wrap
                .insert('a', '#csv')
                .classed('wc-button export', true)
                .attr('id', 'pdf')
                .text('PDF');
    }

    function onLayout() {
        hideListing.call(this);
        addTopScrollBar.call(this);
        disableDefaultSorting.call(this);
        toggleCellText.call(this);
        toggleVisitDates.call(this);
        addPDFExport.call(this);
    }

    function clearSort() {
        var _this = this;

        //Clear sort if visit is not in analysis subset.
        if (
            this.sortable.order.some(function(item) {
                return (
                    _this.config.cols
                        .map(function(col) {
                            return col.replace('-date', '');
                        })
                        .includes(item.col) === false
                );
            })
        ) {
            this.sortable.order = []; //Remove sort buttons.

            this.sortable.wrap.selectAll('.wc-button.sort-box').remove(); //Display sorting instruction.

            this.sortable.wrap.select('.instruction').classed('hidden', false);
        }
    }

    function sortData(data) {
        var _this = this;

        this.data.raw = this.data.raw.sort(function(a, b) {
            var order = 0;

            _this.sortable.order.forEach(function(item) {
                var aCell = a[''.concat(item.col, '-date')]
                    ? a[''.concat(item.col, '-date')]
                    : a[item.col];
                var bCell = b[''.concat(item.col, '-date')]
                    ? b[''.concat(item.col, '-date')]
                    : b[item.col];

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

    function onPreprocess() {
        defineColumns.call(this);
        clearSort.call(this);
        sortData.call(this, this.data.raw);
    }

    function syncScrollBars() {
        var context = this;
        this.scrollBars.upper_outer.on('scroll', function() {
            context.scrollBars.lower_outer.node().scrollLeft = this.scrollLeft;
        });
        this.scrollBars.lower_outer.on('scroll', function() {
            context.scrollBars.upper_outer.node().scrollLeft = this.scrollLeft;
        });
        this.scrollBars.upper_inner.style('width', ''.concat(this.table.node().offsetWidth, 'px'));
        this.scrollBars.lower_inner.style('width', ''.concat(this.table.node().offsetWidth, 'px'));
    }

    function addHeaderHover() {
        //Highlight column when hovering over column header.
        this.thead
            .selectAll('th')
            .on('mouseover', function(d, i) {
                d3.select(this).classed('pvl-header-hover', true);
                d3.selectAll('tr td:nth-child('.concat(i + 1, ')')).classed(
                    'pvl-header-hover',
                    true
                );
            })
            .on('mouseout', function(d, i) {
                d3.select(this).classed('pvl-header-hover', false);
                d3.selectAll('tr td:nth-child('.concat(i + 1, ')')).classed(
                    'pvl-header-hover',
                    false
                );
            });
    }

    function addCellFormatting() {
        var context = this; //Formatting cells via .css.

        this.tbody.selectAll('tr').each(function(d) {
            var visitCells = d3
                .select(this)
                .selectAll('td:nth-child(n + 4)')
                .attr('class', function(di) {
                    return d[''.concat(di.col.replace(/-date$/, ''), '-status')]
                        ? 'pvl-visit-status--'.concat(
                              d[''.concat(di.col.replace(/-date$/, ''), '-status')]
                                  .toLowerCase()
                                  .replace(/[^_a-z-]/g, '-')
                          )
                        : '';
                })
                .classed('pvl-visit-status', true)
                .classed('pvl-visit-status--heat-map', !context.config.display_cell_text)
                .classed('pvl-visit-status--cell-text', context.config.display_cell_text);
            visitCells.each(function(di) {
                var visitCell = d3.select(this);
                di.date = d[''.concat(di.col.replace(/-date$/, ''), '-date')];
                if (d[di.col.replace(/-date$/, '')] !== null)
                    visitCell.attr(
                        'title',
                        ''
                            .concat(d[context.pvl.settings.id_col], ' - ')
                            .concat(di.col.replace(/-date$/, ''), ' (')
                            .concat(di.date, '): ')
                            .concat(d[''.concat(di.col.replace(/-date$/, ''), '-status')])
                    );
            });
        });
    }

    function participant() {
        var _this = this;

        // create dictionary of id columns
        var idDict = d3
            .nest()
            .key(function(d) {
                return d[_this.pvl.settings.id_col];
            })
            .rollup(function(d) {
                return d;
            })
            .map(this.pvl.data.raw); // get all the cells

        var cells = this.table.selectAll('tbody tr').selectAll('td:nth-child(2)'); // create ditionary of table cells

        var cellDict = cells.size()
            ? d3
                  .nest()
                  .key(function(d) {
                      return d[0].__data__.text;
                  })
                  .rollup(function(d) {
                      return d[0];
                  })
                  .map(cells)
            : []; // get ids

        var id_cols = d3
            .set(
                this.data.raw.map(function(d) {
                    return d[_this.pvl.settings.id_col];
                })
            )
            .values();
        id_cols.forEach(function(id) {
            var id_data = idDict[id];
            var id_cell = cellDict[id];

            if (id_data && id_cell) {
                var id_summary = d3
                    .nest()
                    .key(function(d) {
                        return d[_this.pvl.settings.visit_status_col];
                    })
                    .rollup(function(d) {
                        return d3.format('%')(d.length / id_data.length);
                    })
                    .entries(id_data);
                d3.select(id_cell[0]).attr(
                    'title',
                    id_summary
                        .map(function(status) {
                            return ''.concat(status.key, ' (').concat(status.values, ')');
                        })
                        .join('\n')
                );
            }
        });
    }

    function visit() {
        var _this = this;

        this.pvl.data.sets.visit_col.forEach(function(visit) {
            var visit_data = _this.pvl.data.filtered.filter(function(d) {
                return d[_this.pvl.settings.visit_col] === visit.name;
            });

            var visit_summary = d3
                .nest()
                .key(function(d) {
                    return d[_this.pvl.settings.visit_status_col];
                })
                .rollup(function(d) {
                    return d3.format('%')(d.length / visit_data.length);
                })
                .entries(visit_data);

            var visit_cell = _this.table
                .selectAll('thead tr')
                .selectAll('th:not(:first-child)')
                .filter(function(d) {
                    return d === visit.name;
                });

            visit_cell.attr(
                'title',
                ''.concat(visit.name, '\n - ').concat(
                    visit_summary
                        .map(function(status) {
                            return ''.concat(status.key, ' (').concat(status.values, ')');
                        })
                        .join('\n - ')
                )
            );
            if (_this.pvl.settings.abbreviate_visits)
                visit_cell.text(function(d) {
                    var abbreviation = _this.pvl.data.sets.visit_col.find(function(visit) {
                        return visit.name === d;
                    }).abbreviation;

                    return abbreviation !== 'undefined'
                        ? _this.pvl.data.sets.visit_col.find(function(visit) {
                              return visit.name === d;
                          }).abbreviation
                        : d;
                });
        });
    }

    function addSummaries() {
        participant.call(this);
        visit.call(this);
    }

    function onClick(th, header) {
        var context = this;
        var selection = d3.select(th);
        var col = this.config.cols[this.config.headers.indexOf(header)].replace(/-date$/, ''); //Check if column is already a part of current sort order.

        var sortItem = this.sortable.order.find(function(item) {
            return item.col === col;
        }); //If it isn't, add it to sort order.

        if (!sortItem) {
            sortItem = {
                col: col,
                direction: 'ascending',
                wrap: this.sortable.wrap
                    .append('div')
                    .datum({
                        key: col
                    })
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
        } //Hide sort instructions.

        this.sortable.wrap.select('.instruction').classed('hidden', true); //Add sort container deletion functionality.

        this.sortable.order.forEach(function(item, i) {
            item.wrap.on('click', function(d) {
                //Remove column's sort container.
                d3.select(this).remove(); //Remove column from sort.

                context.sortable.order.splice(
                    context.sortable.order
                        .map(function(d) {
                            return d.col;
                        })
                        .indexOf(d.key),
                    1
                ); //Display sorting instruction.

                context.sortable.wrap
                    .select('.instruction')
                    .classed('hidden', context.sortable.order.length); //Redraw chart.

                if (context.sortable.order.length) sortData.call(context);
                else context.data.raw = context.data.initial.slice();
                context.draw();
            });
        }); //Redraw chart.

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
            fgColor: {
                rgb: 'FFcccccc'
            }
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
        var cell = {
            v: value,
            t: type,
            s: styles
        };
        var cell_ref = XLSX.utils.encode_cell({
            c: col,
            r: row
        });
        ws[cell_ref] = cell;
    }

    function clone(obj) {
        var copy; //boolean, number, string, null, undefined

        if ('object' != _typeof(obj) || null == obj) return obj; //date

        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        } //array

        if (obj instanceof Array) {
            copy = [];

            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }

            return copy;
        } //object

        if (obj instanceof Object) {
            copy = {};

            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }

            return copy;
        }

        throw new Error('Unable to copy [obj]! Its type is not supported.');
    }

    function defineXLSX() {
        var _this = this;

        var name = 'Participant Visit Listing';
        var wb = new workBook();
        var ws = {};
        var cols = [];
        var range = {
            s: {
                c: 10000000,
                r: 10000000
            },
            e: {
                c: 0,
                r: 0
            }
        };
        var wbOptions = {
            bookType: 'xlsx',
            bookSST: true,
            type: 'binary'
        };
        var filterRange =
            'A1:' +
            String.fromCharCode(64 + this.config.cols.length) +
            (this.data.filtered.length + 1); //Header row

        this.config.headers.forEach(function(header, col) {
            addCell(wb, ws, header, 'c', clone(headerStyle), range, 0, col);
        }); //Data rows

        this.data.filtered.forEach(function(d, row) {
            _this.config.cols.forEach(function(variable, col) {
                var visit = variable.replace(/-date$/, '');
                var cellStyle = clone(bodyStyle);
                var color = d[''.concat(visit, '-color')];
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
        }); //Define column widths.

        var tr = this.tbody.selectAll('tr').filter(function(d, i) {
            return i === 0;
        });
        tr.selectAll('td').each(function(d, i) {
            cols.push({
                wpx: i > 0 ? this.offsetWidth - 20 : 175
            });
        });
        ws['!ref'] = XLSX.utils.encode_range(range);
        ws['!cols'] = cols;
        ws['!autofilter'] = {
            ref: filterRange
        }; //ws['!freeze'] = { xSplit: '1', ySplit: '1', topLeftCell: 'B2', activePane: 'bottomRight', state: 'frozen' };

        wb.SheetNames.push(name);
        wb.Sheets[name] = ws;
        this.XLSX = XLSX.write(wb, wbOptions);
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
    function FileSaver(view) {
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
                    return new Blob([String.fromCharCode(0xfeff), blob], {
                        type: blob.type
                    });
                }

                return blob;
            },
            FileSaver = function FileSaver(blob, name, no_auto_bom) {
                if (!no_auto_bom) {
                    blob = auto_bom(blob);
                } // First try a.download, then web filesystem, then object URLs

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
                        } // don't create more object URLs than needed

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
            }; // IE 10+ (native saveAs)

        if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
            return function(blob, name, no_auto_bom) {
                name = name || blob.name || 'download';

                if (!no_auto_bom) {
                    blob = auto_bom(blob);
                }

                return navigator.msSaveOrOpenBlob(blob, name);
            };
        } // todo: detect chrome extensions & packaged apps
        //save_link.target = "_blank";

        FS_proto.abort = function() {};

        FS_proto.readyState = FS_proto.INIT = 0;
        FS_proto.WRITING = 1;
        FS_proto.DONE = 2;
        FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;
        return saveAs;
    } //)((typeof self !== 'undefined' && self) || (typeof window !== 'undefined' && window));

    //Convert XLSX file for download.
    function s2ab(s) {
        var i;

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

    function exportXLSX() {
        if (!this.pvl.test) {
            try {
                FileSaver(window)(
                    new Blob([s2ab(this.XLSX)], {
                        type: 'application/octet-stream'
                    }),
                    'participant-visit-listing-'.concat(
                        d3.time.format('%Y-%m-%dT%H-%M-%S')(new Date()),
                        '.xlsx'
                    )
                );
            } catch (error) {
                if (typeof console !== 'undefined') console.log(error);
            }
        }
    }

    function exportToXLSX() {
        var _this = this;

        if (this.config.exportable)
            this.wrap.select('.export#xlsx').on('click', function() {
                defineXLSX.call(_this);
                exportXLSX.call(_this);
            });
    }

    function exportToPDF() {
        var _this = this;

        if (this.config.exportable)
            this.wrap.select('.export#pdf').on('click', function() {
                var doc = new jsPDF('l', 'pt');

                var tableNode = _this.table.node();

                var json = doc.autoTableHtmlToJson(tableNode);
                doc.autoTable(json.columns, json.data);
                doc.save(
                    'participant-visit-listing-'.concat(
                        d3.time.format('%Y-%m-%dT%H-%M-%S')(new Date()),
                        '.pdf'
                    )
                );
            });
    }

    function download(fileType, data) {
        //transform blob array into a blob of characters
        var blob = new Blob(data, {
            type:
                fileType === 'csv'
                    ? 'text/csv;charset=utf-8;'
                    : fileType === 'xlsx'
                    ? 'application/octet-stream'
                    : console.warn('File type not supported: '.concat(fileType))
        });
        var fileName = 'participant-visit-listing-'
            .concat(d3.time.format('%Y-%m-%dT%H-%M-%S')(new Date()), '.')
            .concat(fileType);
        var link = this.wrap.select('.export#'.concat(fileType));
        if (navigator.msSaveBlob)
            //IE
            navigator.msSaveBlob(blob, fileName);
        else if (link.node().download !== undefined) {
            //21st century browsers
            var url = URL.createObjectURL(blob);
            link.node().setAttribute('href', url);
            link.node().setAttribute('download', fileName);
        }
    }

    function exportToCSV() {
        var _this = this;

        if (this.config.exportable)
            this.wrap.select('.export#csv').on('click', function() {
                var CSVarray = []; //add headers to CSV array

                var headers = _this.config.headers.map(function(header) {
                    return '"'.concat(header.replace(/"/g, '""'), '"');
                });

                CSVarray.push(headers); //add rows to CSV array

                _this.data.filtered.forEach(function(d, i) {
                    var row = _this.config.cols.map(function(col) {
                        var value = d[col];
                        if (typeof value === 'string') value = value.replace(/"/g, '""');
                        return '"'.concat(value, '"');
                    });

                    CSVarray.push(row);
                }); //Download .csv file.

                download.call(_this, 'csv', [CSVarray.join('\n')]);
            });
    }

    function onDraw() {
        //Sync top and bottom scroll bars.
        syncScrollBars.call(this); //Highlight column when hovering over column header.

        addHeaderHover.call(this); //Sort columns on click chronologically.

        sortChronologically.call(this); //Add row and column summaries.

        addSummaries.call(this); //Add data-driven cell formatting.

        addCellFormatting.call(this); //Add styled export to .xlsx.

        exportToXLSX.call(this); //Add styled (eventually) export to .pdf.

        exportToPDF.call(this); //Add export to .csv.

        exportToCSV.call(this);
        if (this.pvl.settings.active_tab === 'Listing')
            this.pvl.containers.loading.classed('pvl-hidden', true);
    }

    function onDestroy() {}

    function listing() {
        //Define listing.
        this.listing = new webcharts.createTable(
            this.containers.listing.node(),
            this.settings.listingSynced,
            this.controls
        );
        this.listing.pvl = this; //Define callbacks.

        this.listing.on('init', onInit);
        this.listing.on('layout', onLayout);
        this.listing.on('preprocess', onPreprocess);
        this.listing.on('draw', onDraw);
        this.listing.on('destroy', onDestroy);
    }

    function setXDomain() {
        var _this = this;

        this.config.x.domain = this.pvl.data.sets.scheduledVisits;
        this.config.marks.forEach(function(mark) {
            mark.values[_this.pvl.settings.visit_col] = _this.pvl.data.sets.scheduledVisits;
        });
    }

    function onInit$1() {
        this.initialized = true;
        this.property = 'ordinalChart';
        setXDomain.call(this);
    }

    function addTopXAxis() {
        this.topXAxis = {
            container: this.wrap
                .insert('div', ':first-child')
                .classed('pvl-floating-axis', true)
                .style('height', ''.concat(this.pvl.settings.chart_margin.top, 'px'))
        };
        this.topXAxis.svg = this.topXAxis.container
            .append('svg')
            .append('g')
            .classed('x x--top axis ordinal', true);
        this.topXAxis.label = this.topXAxis.svg
            .append('text')
            .classed('axis-title axis-title--top', true);
    }

    function minimize() {
        var _this = this;

        loading.call(this.pvl, ''.concat(this.property, '.minimize()'), function() {
            var thisChart = _this.property;
            var thatChart = _this.property === 'linearChart' ? 'ordinalChart' : 'linearChart';

            _this.pvl.containers[thisChart].classed('pvl-hidden', true);

            _this.pvl.containers[thatChart].classed('pvl-hidden', false).style('width', '100%');

            _this.pvl[thatChart].draw();

            _this.pvl.containers.visitExpectationLegend.past.rect.classed(
                'pvl-hidden',
                thatChart === 'linearChart'
            );

            _this.pvl.containers.visitExpectationLegend.future.rect.classed(
                'pvl-hidden',
                thatChart === 'linearChart'
            );
        });
    }

    function split() {
        var _this = this;

        loading.call(this.pvl, ''.concat(this.property, '.split()'), function() {
            _this.pvl.containers.ordinalChart.classed('pvl-hidden', false).style('width', '49.5%');

            _this.pvl.ordinalChart.draw();

            _this.pvl.containers.linearChart.classed('pvl-hidden', false).style('width', '49.5%');

            _this.pvl.linearChart.draw();

            _this.pvl.containers.visitExpectationLegend.past.rect.classed('pvl-hidden', false);

            _this.pvl.containers.visitExpectationLegend.future.rect.classed('pvl-hidden', false);
        });
    }

    function maximize() {
        var _this = this;

        loading.call(this.pvl, ''.concat(this.property, '.maximize()'), function() {
            var thisChart = _this.property;
            var thatChart = _this.property === 'linearChart' ? 'ordinalChart' : 'linearChart';

            _this.pvl.containers[thatChart].classed('pvl-hidden', true);

            _this.pvl.containers[thisChart].classed('pvl-hidden', false).style('width', '100%');

            _this.pvl[thisChart].draw();

            _this.pvl.containers.visitExpectationLegend.past.rect.classed(
                'pvl-hidden',
                thisChart === 'linearChart'
            );

            _this.pvl.containers.visitExpectationLegend.future.rect.classed(
                'pvl-hidden',
                thisChart === 'linearChart'
            );
        });
    }

    function addButtons() {
        var _this = this;

        //Add minimize chart button.
        this.topXAxis.minimize = this.topXAxis.svg
            .append('text')
            .classed('pvl-chart-button pvl-chart-button--minimize', true)
            .text('\u2212')
            .on('click', function() {
                return minimize.call(_this);
            });
        this.topXAxis.minimize.append('title').text('MinimizeChart'); //Add split chart button.

        this.topXAxis.split = this.topXAxis.svg
            .append('text')
            .classed('pvl-chart-button pvl-chart-button--split', true)
            .text('\u25A1\u25A1')
            .on('click', function() {
                return split.call(_this);
            });
        this.topXAxis.split.append('title').text('View both charts'); //Add maximize chart button.

        this.topXAxis.maximize = this.topXAxis.svg
            .append('text')
            .classed('pvl-chart-button pvl-chart-button--maximize', true)
            .text('+')
            .on('click', function() {
                return maximize.call(_this);
            });
        this.topXAxis.maximize.append('title').text('Maximize Chart');
    }

    function scrollTopXAxis() {
        var context = this;
        var div_top = this.topXAxis.container.node().getBoundingClientRect().top;
        window.addEventListener('scroll', function() {
            var window_top = window.scrollY - 0;

            if (window_top > div_top) {
                if (!context.topXAxis.container.classed('pvl-sticky'))
                    context.topXAxis.container.classed('pvl-sticky', true);
            } else {
                context.topXAxis.container.classed('pvl-sticky', false);
            }
        });
    }

    function attachBottomXAxis() {
        this.bottomXAxis = {
            svg: this.svg.select('.x.axis').classed('x--bottom', true)
        };
    }

    function hideCharts() {
        //Hide Charts container if the Listing tab is active.
        if (
            this.pvl.settings.chart_layout === 'side-by-side' &&
            this.pvl.settings.active_tab !== 'Charts' &&
            this.property === 'linearChart'
        )
            this.pvl.containers.charts.classed('pvl-hidden', true); //Hide the other chart container if its tab is not active.

        if (this.pvl.settings.chart_layout === 'tabbed') {
            var otherProperty = this.property === 'ordinalChart' ? 'linearChart' : 'ordinalChart';
            this.pvl.containers[otherProperty].classed('pvl-hidden', true);
        } //Hide listing.

        if (this.pvl.settings.active_tab !== 'Listing')
            this.pvl.containers.listing.classed('pvl-hidden', true);
    }

    function onLayout$1() {
        addTopXAxis.call(this);
        addButtons.call(this);
        scrollTopXAxis.call(this);
        attachBottomXAxis.call(this);
        hideCharts.call(this);
    }

    function setXDomain$1() {
        this.config.x.domain = this.pvl.data.sets.scheduledVisits;
    }

    function setYDomain() {
        this.config.y.domain = this.pvl.data.sets.id_col.slice().reverse();
    }

    function onPreprocess$1() {
        setXDomain$1.call(this);
        setYDomain.call(this);
    }

    function onDataTransform() {}

    function onDraw$1() {}

    function removeLegend() {
        this.legend.remove();
    }

    function drawTopXAxis() {
        //Set width and height of floating x-axis.
        this.topXAxis.container.select('svg').attr({
            width: this.wrap.select('.wc-svg').attr('width'),
            height: '100px'
        }); //Draw top x-axis.

        this.topXAxis.axis = d3.svg
            .axis()
            .scale(this.x)
            .orient('top')
            .ticks(this.xAxis.ticks()[0])
            .innerTickSize(this.xAxis.innerTickSize())
            .outerTickSize(this.xAxis.outerTickSize());
        if (this.config.x.type === 'linear')
            this.topXAxis.axis.tickFormat(d3.format(this.config.x.format));
        this.topXAxis.svg
            .attr({
                transform: 'translate('
                    .concat(this.margin.left, ',')
                    .concat(this.pvl.settings.chart_margin.top, ')')
            })
            .call(this.topXAxis.axis);
        this.topXAxis.label
            .attr({
                transform: 'translate('
                    .concat(this.plot_width / 2, ',-')
                    .concat(this.pvl.settings.chart_margin.top - 25, ')'),
                'text-anchor': 'middle'
            })
            .text('Schedule of Events by '.concat(this.config.x.label));
    }

    function positionButtons() {
        this.topXAxis.minimize.attr({
            transform: 'translate('
                .concat(this.plot_width - 60, ',-')
                .concat(this.pvl.settings.chart_margin.top - 25, ')'),
            'text-anchor': 'middle'
        });
        this.topXAxis.split.attr({
            transform: 'translate('
                .concat(this.plot_width - 35, ',-')
                .concat(this.pvl.settings.chart_margin.top - 25 + 6, ')'),
            'text-anchor': 'middle'
        });
        this.topXAxis.maximize.attr({
            transform: 'translate('
                .concat(this.plot_width - 10, ',-')
                .concat(this.pvl.settings.chart_margin.top - 25, ')'),
            'text-anchor': 'middle'
        });
    }

    function rotateXAxisTickLabels() {
        //Rotate top x-axis tick labels.
        this.topXAxis.svg
            .selectAll('.tick text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'start'); //Rotate bottom x-axis tick labels.

        this.bottomXAxis.svg
            .selectAll('.tick text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');
    }

    function addTooltipsToXAxisTicks() {
        var _this = this;

        this.wrap.selectAll('.pvl-x-tooltip').remove();
        this.wrap
            .selectAll('.x.axis .tick')
            .append('title')
            .classed('pvl-x-tooltip', true)
            .text(function(d) {
                var visit_data = _this.pvl.data.filtered.filter(function(di) {
                    return di[_this.pvl.settings.visit_col] === d;
                });

                var visit_summary = d3
                    .nest()
                    .key(function(d) {
                        return d[_this.pvl.settings.visit_status_col];
                    })
                    .rollup(function(d) {
                        return d3.format('%')(d.length / visit_data.length);
                    })
                    .entries(visit_data);
                return ''.concat(d, '\n - ').concat(
                    visit_summary
                        .map(function(status) {
                            return ''.concat(status.key, ' (').concat(status.values, ')');
                        })
                        .join('\n - ')
                );
            });
    }

    function getItHeated() {
        var context = this;
        this.marks[0].groups.each(function(d) {
            var group = d3.select(this);
            group.select('rect.pvl-heat-rect').remove();
            d.heat = group
                .append('rect')
                .classed('pvl-heat-rect', true)
                .attr({
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

    function mousemove(mouse) {
        var _this = this;

        var coords = d3.mouse(mouse); //x

        var x = coords[0];

        if (this.config.x.type === 'ordinal') {
            var x_coord = this.x_coords.find(function(x_coord) {
                return x_coord.coord <= x && x < x_coord.coord + _this.x.rangeBand();
            });

            if (x_coord) {
                this.wrap.selectAll('.x.axis .tick line').style({
                    stroke: function stroke(d) {
                        return d === x_coord.value ? 'black' : '#eee';
                    },
                    'stroke-width': function strokeWidth(d) {
                        return d === x_coord.value ? 2 : 1;
                    }
                });
                this.wrap.selectAll('.x.axis .tick text').attr('font-weight', function(d) {
                    return d === x_coord.value ? 'bold' : 'normal';
                });
            }
        } else {
            this.topXAxis.svg.select('.tick--highlight').remove();
            if (x > 0)
                this.topXAxis.svg
                    .append('g')
                    .classed('tick tick--highlight', true)
                    .append('text')
                    .classed('pvl-highlight-x-tick-label', true)
                    .attr({
                        x: x,
                        y: -9,
                        'text-anchor': 'middle'
                    })
                    .style({
                        'font-weight': 'bold'
                    })
                    .text(Math.round(this.x.invert(x)));
        } //y

        var y = coords[1];
        var y_coord = this.y_coords.find(function(y_coord) {
            return y_coord.coord <= y && y < y_coord.coord + _this.y.rangeBand();
        });

        if (y_coord) {
            this.wrap.selectAll('.y.axis .tick line').style({
                stroke: function stroke(d) {
                    return d === y_coord.value ? 'black' : '#eee';
                },
                'stroke-width': function strokeWidth(d) {
                    return d === y_coord.value ? 2 : 1;
                }
            });
            this.wrap.selectAll('.y.axis .tick text').attr('font-weight', function(d) {
                return d === y_coord.value ? 'bold' : 'normal';
            });
        }
    }

    function mousemove$1(mouse) {
        //x
        if (this.config.x.type === 'ordinal') {
            this.wrap.selectAll('.x.axis .tick line').style({
                stroke: '#eee',
                'stroke-width': 1
            });
            this.wrap.selectAll('.x.axis .tick text').attr('font-weight', 'normal');
        } else {
            this.topXAxis.svg.select('.tick--highlight').remove();
        } //y

        this.wrap.selectAll('.y.axis .tick line').style({
            stroke: '#eee',
            'stroke-width': 1
        });
        this.wrap.selectAll('.y.axis .tick text').attr('font-weight', 'normal');
    }

    function highlightTickLabels() {
        var _this = this;

        var context = this;
        this.x_coords = this.x_dom.map(function(value) {
            return {
                value: value,
                coord: _this.x(value)
            };
        });
        this.y_coords = this.y_dom.map(function(value) {
            return {
                value: value,
                coord: _this.y(value)
            };
        });
        this.svg
            .on('mouseover', function() {
                mousemove.call(context, this);
            })
            .on('mousemove', function() {
                mousemove.call(context, this);
            })
            .on('mouseout', function() {
                mousemove$1.call(context, this);
            });
    }

    function abbreviateXAxisTickLabels() {
        var _this = this;

        if (this.pvl.settings.abbreviate_visits)
            this.wrap.selectAll('.x.axis .tick text').text(function(d) {
                var abbreviation = _this.pvl.data.sets.visit_col.find(function(visit) {
                    return visit.name === d;
                }).abbreviation;

                return abbreviation !== 'undefined'
                    ? _this.pvl.data.sets.visit_col.find(function(visit) {
                          return visit.name === d;
                      }).abbreviation
                    : d;
            });
    }

    function onResize() {
        removeLegend.call(this);
        drawTopXAxis.call(this);
        positionButtons.call(this);
        rotateXAxisTickLabels.call(this);
        addTooltipsToXAxisTicks.call(this);
        getItHeated.call(this);
        highlightTickLabels.call(this);
        abbreviateXAxisTickLabels.call(this);
        if (this.pvl.settings.active_tab === 'Study Day Chart')
            this.pvl.containers.loading.classed('pvl-hidden', true);
    }

    function onDestroy$1() {}

    function ordinalChart() {
        //Define listing.
        this.ordinalChart = new webcharts.createChart(
            this.containers.ordinalChart.node(),
            this.settings.ordinalChartSynced,
            this.controls
        );
        this.ordinalChart.pvl = this; //Define callbacks.

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
        scrollTopXAxis.call(this);
        attachBottomXAxis.call(this);
        hideCharts.call(this);
    }

    function onPreprocess$2() {
        setYDomain.call(this);
    }

    function onDataTransform$1() {}

    function onDraw$2() {}

    function addAnnotationLegend() {
        var _this = this;

        if (this.pvl.data.sets.unscheduledVisits.length)
            this.topXAxis.svg.selectAll('.pvl-unscheduled-legend-item').remove();
        this.pvl.data.sets.unscheduledVisits.forEach(function(visit, i) {
            _this.topXAxis.svg
                .append('text')
                .datum(visit)
                .classed('pvl-unscheduled-legend-item', true)
                .attr({
                    transform: 'translate(-'
                        .concat(_this.margin.left - 15, ',-')
                        .concat(_this.pvl.settings.chart_margin.top - 16 * (i + 1) - 3, ')')
                })
                .text(''.concat(visit.substring(0, 1), ' - ').concat(visit, ' Visit'));
        });
    }

    function attachMarks() {
        this.points = this.marks.filter(function(mark) {
            return mark.type === 'circle';
        })[0].groups;
        this.blanks = this.marks.filter(function(mark) {
            return mark.type === 'circle';
        })[1].groups;
        this.annotations = this.marks.find(function(mark) {
            return mark.type === 'text';
        }).groups;
    }

    function updateTextMarks() {
        this.annotations
            .selectAll('text')
            .classed('pvl-unscheduled-annotation', true)
            .style('clip-path', null);
    }

    function mouseover(element, d) {
        var mark = d3.select(element).selectAll('.wc-data-mark');
        if (mark.node().tagName !== 'text')
            mark.attr({
                stroke: 'black'
            });
        else
            this.marks[0].circles
                .filter(function(di) {
                    return di.key === d.key;
                })
                .attr({
                    stroke: 'black'
                });
    }

    function clearHighlight() {
        var deleteHighlight =
            arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (this.highlight) {
            //Remove highlight lines and visit annotation.
            if (deleteHighlight) {
                this.highlight.container.remove();
                delete this.highlight;
            } else {
                this.highlight.container.selectAll('*').remove();
            } //De-class highlighted circles and reset their opacity.

            this.points
                .classed('pvl-highlighted-visit', false)
                .selectAll('circle')
                .attr({
                    'fill-opacity': 1,
                    'stroke-opacity': 1
                }); //Reset annotation opacity.

            this.annotations.selectAll('text').attr({
                'fill-opacity': 1,
                'stroke-opacity': 1
            });
        }
    }

    function deemphasizeMarks() {
        this.points.selectAll('circle').attr({
            'fill-opacity': 0.25,
            'stroke-opacity': 0.25
        });
        this.blanks.selectAll('circle').attr({
            'stroke-opacity': 0.25
        });
        this.annotations.selectAll('text').attr({
            'fill-opacity': 0.25,
            'stroke-opacity': 0.25
        });
    }

    var lineAttributes = {
        stroke: 'black',
        'stroke-width': '2px',
        'stroke-opacity': 0.5,
        //'stroke-dasharray': '2,2',
        'stroke-linecap': 'butt'
    };

    function addReferenceLine() {
        this.highlight.referenceLine = this.highlight.container
            .append('line')
            .classed('pvl-highlighted-visit-mark pvl-highlighted-visit-mark--reference-line', true)
            .attr(
                _objectSpread(
                    {
                        x1: this.x(this.highlight.referenceDay),
                        x2: this.x(this.highlight.referenceDay),
                        y1: 0,
                        y2: this.plot_height
                    },
                    lineAttributes
                )
            );
        this.highlight.referenceLine.append('title').text(this.highlight.tooltip);
    }

    function addReferenceText() {
        this.highlight.referenceText = this.highlight.container
            .append('text')
            .classed('pvl-highlighted-visit-mark pvl-highlighted-visit-mark--reference-text', true)
            .attr({
                x: this.x(this.highlight.referenceDay),
                dx: this.highlight.referenceDay <= (this.x_dom[1] - this.x_dom[0]) / 2 ? 5 : -5,
                y: 0,
                dy: 5,
                'font-size': '12px',
                'text-anchor':
                    this.highlight.referenceDay <= (this.x_dom[1] - this.x_dom[0]) / 2
                        ? 'beginning'
                        : 'end'
            })
            .style('font-weight', 'bold')
            .text(
                ''.concat(this.highlight.visit, ' (Day ').concat(this.highlight.referenceDay, ')')
            );
        this.highlight.referenceText.append('title').text(this.highlight.tooltip);
    }

    function addHighlightLines() {
        var context = this;
        this.highlight.points.each(function(di) {
            var point = d3.select(this); //Add a horizontal line to the reference line.

            var line = context.highlight.container
                .append('line')
                .classed(
                    'pvl-highlighted-visit-mark pvl-highlighted-visit-mark--highlight-line',
                    true
                )
                .attr(
                    _objectSpread(
                        {
                            x1: context.x(di.values.x),
                            x2: context.x(context.highlight.referenceDay),
                            y1: context.y(di.values.y) + context.y.rangeBand() / 2,
                            y2: context.y(di.values.y) + context.y.rangeBand() / 2
                        },
                        lineAttributes
                    )
                );
            line.append('title').text(
                'Number of days from reference study day: '.concat(
                    di.values.x - context.highlight.referenceDay,
                    '\nClick to clear highlighting.'
                )
            ); //Increase opacity.

            point.selectAll('circle').attr({
                'fill-opacity': 1,
                'stroke-opacity': 1
            });
        });
    }

    function click(element, d) {
        var _this = this;

        clearHighlight.call(this, !!d); //Capture selected visit value.

        if (d) {
            this.highlight = {
                visit: d.values.raw[0][this.pvl.settings.visit_col],
                container: this.svg
                    .insert('g', '.mark1')
                    .classed('pvl-highlighted-visit-container', true)
                    .on('click', function() {
                        return clearHighlight.call(_this);
                    })
            };
            this.highlight.statistics = this.pvl.data.statistics.visits[this.highlight.visit];
            this.highlight.referenceDay = Math.round(this.highlight.statistics.median);
            this.highlight.tooltip = ''.concat(
                this.highlight.statistics.tooltip,
                '\nClick to remove highlighting.'
            );
        } //Reduce opacity of all circles.

        deemphasizeMarks.call(this); //Select points representing selected visit value.

        this.highlight.points = this.svg
            .selectAll('.point')
            .filter(function(di) {
                return di.values.raw[0][_this.pvl.settings.visit_col] === _this.highlight.visit;
            })
            .classed('pvl-highlighted-visit', true); //Add a reference line of the median study day of the selected visit.

        addReferenceLine.call(this); //Add reference text annotation.

        addReferenceText.call(this); //Highlight points representing selected visit value.

        addHighlightLines.call(this);
    }

    function mouseout(element, d) {
        var mark = d3.select(element).selectAll('.wc-data-mark');
        if (mark.node().tagName !== 'text')
            mark.attr({
                stroke: this.colorScale(d.values.raw[0][this.pvl.settings.visit_status_col])
            });
        else
            this.marks[0].circles
                .filter(function(di) {
                    return di.key === d.key;
                })
                .attr({
                    stroke: this.colorScale(d.values.raw[0][this.pvl.settings.visit_status_col])
                });
    }

    function highlightVisit() {
        var context = this;
        this.marks.forEach(function(mark) {
            mark.groups
                .on('mouseover', function(d) {
                    mouseover.call(context, this, d);
                })
                .on('click', function(d) {
                    if (
                        !context.highlight ||
                        context.highlight.visit !== d.values.raw[0][context.pvl.settings.visit_col]
                    )
                        click.call(context, this, d);
                    else clearHighlight.call(context);
                })
                .on('mouseout', function(d) {
                    mouseout.call(context, this, d);
                });
        });
    }

    function maintainHighlight() {
        if (this.highlight) click.call(this);
    }

    function onResize$1() {
        removeLegend.call(this);
        drawTopXAxis.call(this);
        addAnnotationLegend.call(this);
        positionButtons.call(this);
        attachMarks.call(this);
        updateTextMarks.call(this);
        highlightTickLabels.call(this);
        highlightVisit.call(this);
        maintainHighlight.call(this);
        if (['Charts', 'Study Day Chart'].indexOf(this.pvl.settings.active_tab) > -1)
            this.pvl.containers.loading.classed('pvl-hidden', true);
    }

    function onDestroy$2() {}

    function linearChart() {
        //Define listing.
        this.linearChart = new webcharts.createChart(
            this.containers.linearChart.node(),
            this.settings.linearChartSynced,
            this.controls
        );
        this.linearChart.pvl = this; //Define callbacks.

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

    function checkFilterCol(input) {
        var filterCol = input.value_col;
        this.data.missingVariables[filterCol] = this.data.variables.indexOf(filterCol) > -1;

        if (!this.data.missingVariables[filterCol]) {
            this.settings.controlsSynced.inputs = this.settings.controlsSynced.inputs.filter(
                function(input) {
                    return input.value_col !== filterCol;
                }
            );
            this.ordinalChart.controls.config.inputs = this.ordinalChart.controls.config.inputs.filter(
                function(input) {
                    return input.value_col !== filterCol;
                }
            );
            this.linearChart.controls.config.inputs = this.linearChart.controls.config.inputs.filter(
                function(input) {
                    return input.value_col !== filterCol;
                }
            );
            this.listing.controls.config.inputs = this.listing.controls.config.inputs.filter(
                function(input) {
                    return input.value_col !== filterCol;
                }
            );
        } else {
            this.data.filters.push({
                col: filterCol,
                value: 'All'
            });
        }
    }

    function checkRequiredVariables() {
        var _this = this;

        this.settings.controlsSynced.inputs
            .filter(function(input) {
                return input.type === 'subsetter';
            })
            .forEach(function(input) {
                checkFilterCol.call(_this, input);
            });
    }

    function recordLevel() {
        var _this = this;

        //Derive record-level variables.
        this.data.raw.forEach(function(d) {
            d.visitDate = d[_this.settings.visit_date_col];
            d.visitCharacter = d[_this.settings.visit_col].substring(0, 1);
            d.expected = _this.settings.visit_expectation_regex
                ? _this.settings.visit_expectation_regex.test(d[_this.settings.visit_status_col])
                : false;
            d.unscheduled = _this.settings.visit_exclusion_regex
                ? _this.settings.visit_exclusion_regex.test(d[_this.settings.visit_col])
                : false;
            d.overdue = _this.settings.visit_overdue_regex
                ? _this.settings.visit_overdue_regex.test(d[_this.settings.visit_status_col])
                : false;
        });
    }

    function addVariables() {
        recordLevel.call(this);
        idLevel.call(this);
        this.data.variables = Object.keys(this.data.raw[0]);
    }

    function defineVisitStatusSet() {
        var _this = this;

        this.data.sets.visit_status_col = d3
            .set(
                this.data.raw.map(function(d) {
                    return ''
                        .concat(d[_this.settings.visit_status_order_col], ':|:')
                        .concat(d[_this.settings.visit_status_col], ':|:')
                        .concat(d[_this.settings.visit_status_color_col].toLowerCase(), ':|:')
                        .concat(d[_this.settings.visit_status_description_col]);
                })
            )
            .values()
            .sort(function(a, b) {
                return +a.split(':|:')[0] - +b.split(':|:')[0];
            }); //Update ordinal chart settings.

        this.ordinalChart.config.color_dom = this.data.sets.visit_status_col.map(function(
            visit_status
        ) {
            return visit_status.split(':|:')[1];
        });
        this.ordinalChart.config.colors = this.data.sets.visit_status_col.map(function(
            visit_status
        ) {
            return visit_status.split(':|:')[2];
        });
        this.ordinalChart.config.legend.order = this.data.sets.visit_status_col.map(function(
            visit_status
        ) {
            return visit_status.split(':|:')[1];
        }); //Update linear chart settings.

        this.linearChart.config.color_dom = this.data.sets.visit_status_col.map(function(
            visit_status
        ) {
            return visit_status.split(':|:')[1];
        });
        this.linearChart.config.colors = this.data.sets.visit_status_col.map(function(
            visit_status
        ) {
            return visit_status.split(':|:')[2];
        });
        this.linearChart.config.legend.order = this.data.sets.visit_status_col.map(function(
            visit_status
        ) {
            return visit_status.split(':|:')[1];
        });
    }

    function defineLegendSet() {
        var _this = this;

        this.data.sets.legend = d3
            .set(
                this.data.raw
                    .filter(function(d) {
                        return (
                            d[_this.settings.visit_status_exclusion_col] !==
                            _this.settings.visit_status_exclusion_value
                        );
                    })
                    .map(function(d) {
                        return ''
                            .concat(d[_this.settings.visit_status_order_col], ':|:')
                            .concat(d[_this.settings.visit_status_col], ':|:')
                            .concat(d[_this.settings.visit_status_color_col].toLowerCase(), ':|:')
                            .concat(d[_this.settings.visit_status_description_col]);
                    })
            )
            .values()
            .sort(function(a, b) {
                return +a.split(':|:')[0] - +b.split(':|:')[0];
            });
        this.data.sets.past_visits = this.data.sets.legend
            .map(function(visit_status) {
                return visit_status.split(':|:')[1];
            })
            .filter(function(visit_status) {
                return !_this.settings.visit_expectation_regex.test(visit_status);
            });
        this.data.sets.future_visits = this.data.sets.legend
            .map(function(visit_status) {
                return visit_status.split(':|:')[1];
            })
            .filter(function(visit_status) {
                return _this.settings.visit_expectation_regex.test(visit_status);
            });
    }

    function defineSets() {
        var _this = this;

        [
            'site_col',
            'id_col',
            'id_status_col',
            'visit_col', // with visit_order_col
            'visit_status_col' // with visit_status_order_col, visit_status_color_col, and visit_status_description_col
        ].forEach(function(col) {
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

    function calculateVisitStatistics() {
        var _this = this;

        this.data.statistics.visits = this.data.sets.visit_col
            .map(function(visit) {
                return visit.name;
            })
            .reduce(function(visits, visit) {
                visits[visit] = {
                    name: visit
                };
                return visits;
            }, {});
        var statistics = ['n', 'min', 'median', 'max', 'mean', 'deviation'];
        Object.keys(this.data.statistics.visits)
            .map(function(visit) {
                return _this.data.statistics.visits[visit];
            })
            .forEach(function(visit) {
                visit.data = _this.data.raw.filter(function(d) {
                    return d[_this.settings.visit_col] === visit.name;
                });
                visit.days = visit.data
                    .map(function(d) {
                        return +d[_this.settings.visit_day_col];
                    })
                    .sort(function(a, b) {
                        return a - b;
                    });
                visit.n = visit.days.length;
                statistics
                    .filter(function(statistic) {
                        return statistic !== 'n';
                    })
                    .forEach(function(statistic) {
                        visit[statistic] = d3[statistic](visit.days);
                    });
                visit.tooltip = [
                    visit.name,
                    'Reference day: '.concat(visit.median, ' (median)'),
                    'Statistics:'
                ]
                    .concat(
                        _toConsumableArray(
                            statistics.map(function(statistic) {
                                return ' - '
                                    .concat(statistic, ': ')
                                    .concat(
                                        ['mean', 'deviation'].includes(statistic)
                                            ? d3.format('.1f')(visit[statistic])
                                            : Math.round(visit[statistic])
                                    );
                            })
                        )
                    )
                    .join('\n'); //visit.uniqueDays = d3.nest().key(d => d).rollup(d => d.length).entries(visit.days);
                //visit.mode = visit.uniqueDays.filter(d => d.values === d3.max(visit.uniqueDays, di => di.values));
            });
    }

    function addVisitStatusStyles() {
        var visitStatusStyles = this.data.sets.visit_status_col
            .map(function(visit_status) {
                var split = visit_status.split(':|:');
                var order = split[0];
                var status = split[1].toLowerCase().replace(/[^_a-z-]/g, '-'); //.replace(/ /g, '.');

                var color = split[2];
                var styles = [
                    '.pvl-visit-status--'.concat(status, ' {'),
                    '    border-top: 2px solid '.concat(color, ';'),
                    '    border-bottom: 2px solid '.concat(color, ';'),
                    '}',
                    '.pvl-visit-status--heat-map.pvl-visit-status--'.concat(status, ' {'),
                    '    background: '.concat(color, ';'),
                    '    color: transparent;',
                    '    opacity: .9;',
                    '}',
                    '.pvl-visit-status--cell-text.pvl-visit-status--'.concat(status, ' {'),
                    '    color: '.concat(color, ';'),
                    '    opacity: 1;',
                    '}',
                    'tr:nth-child(odd) .pvl-visit-status--cell-text.pvl-visit-status--'.concat(
                        status,
                        ' {'
                    ),
                    '    background: white;',
                    '}',
                    'tr:nth-child(even) .pvl-visit-status--cell-text.pvl-visit-status--'.concat(
                        status,
                        ' {'
                    ),
                    '    background: #eee;',
                    '}'
                ];
                return styles.join('\n');
            })
            .join('\n');
        this.containers.style.html(
            ''.concat(this.containers.style.html(), '\n').concat(visitStatusStyles)
        );
    }

    function addVisitStatusLegend() {
        var context = this;
        this.containers.legendLabel = this.containers.legend
            .append('span')
            .classed('pvl-legend__label', true)
            .text('Visit Status');
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
                    return '2px solid '.concat(d[2] === 'black' ? '#ccc' : d[2]);
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
                    return context.settings.visit_expectation_regex &&
                        context.settings.visit_expectation_regex.test(d[1])
                        ? ''
                              .concat(d[3], '\n')
                              .concat(
                                  d[1],
                                  ' visits are identified in the charts as cells or circles with medial white circles.'
                              )
                        : d[3];
                });
        });
        update.call(this);
    }

    function rectAttributes() {
        return {
            x: 0,
            width: 100,
            y: 0,
            height: this.settings.ordinalChartSynced.y.range_band,
            fill: 'black',
            'fill-opacity': 1,
            stroke: '#aaa'
        };
    }

    function textAttributes() {
        return {
            attr: {
                x: 104,
                y: 12
            },
            style: {
                'font-size': '12px'
            }
        };
    }

    function innerCircleAttributes() {
        return {
            cx: 50,
            cy: this.settings.ordinalChartSynced.y.range_band / 2,
            r: this.settings.ordinalChartSynced.marks[1].radius,
            fill: 'white',
            stroke: 'black'
        };
    }

    function outerCircleAttributes() {
        return {
            cx: 50,
            cy: this.settings.ordinalChartSynced.y.range_band / 2,
            r: this.settings.linearChartSynced.marks[0].radius,
            fill: 'black',
            stroke: 'black'
        };
    }

    function addVisitExpectationLegend() {
        var _this = this;

        this.containers.visitExpectationLegend = {
            g: this.containers.visitExpectationLegendContainer
                .append('svg')
                .attr({
                    width: 400,
                    height: this.containers.tabContainer.node().offsetHeight
                })
                .append('g')
                .classed('pvl-mark-legend', true)
        }; //past visits

        this.containers.visitExpectationLegend.past = {
            g: this.containers.visitExpectationLegend.g
                .append('g')
                .classed('pvl-mark-legend__item pvl-mark-legend__item--past', true)
                .attr({
                    transform: 'translate(0,'.concat(4, ')')
                })
        };
        this.containers.visitExpectationLegend.past.rect = this.containers.visitExpectationLegend.past.g
            .append('rect')
            .attr(rectAttributes.call(this));
        this.containers.visitExpectationLegend.past.outerCircle = this.containers.visitExpectationLegend.past.g
            .append('circle')
            .attr(outerCircleAttributes.call(this));
        this.containers.visitExpectationLegend.past.text = this.containers.visitExpectationLegend.past.g
            .append('text')
            .attr(textAttributes.call(this).attr)
            .style(textAttributes.call(this).style);
        this.containers.visitExpectationLegend.past.text
            .selectAll('tspan')
            .data(this.data.sets.past_visits)
            .enter()
            .append('tspan')
            .attr('fill', function(d) {
                return _this.data.sets.visit_status_col
                    .find(function(visit_status) {
                        return visit_status.split(':|:')[1] === d;
                    })
                    .split(':|:')[2];
            })
            .text(function(d, i) {
                return d;
            });
        this.containers.visitExpectationLegend.past.text.html(
            this.containers.visitExpectationLegend.past.text
                .html()
                .replace('</tspan><tspan', '</tspan>/<tspan')
        ); //future visits

        this.containers.visitExpectationLegend.future = {
            g: this.containers.visitExpectationLegend.g
                .append('g')
                .classed('pvl-mark-legend__item pvl-mark-legend__item--future', true)
                .attr({
                    transform: 'translate(0,'.concat(
                        4 * 2 + this.settings.ordinalChartSynced.y.range_band,
                        ')'
                    )
                })
        };
        this.containers.visitExpectationLegend.future.rect = this.containers.visitExpectationLegend.future.g
            .append('rect')
            .attr(rectAttributes.call(this));
        this.containers.visitExpectationLegend.future.outerCircle = this.containers.visitExpectationLegend.future.g
            .append('circle')
            .attr(outerCircleAttributes.call(this));
        this.containers.visitExpectationLegend.future.innerCircle = this.containers.visitExpectationLegend.future.g
            .append('circle')
            .attr(innerCircleAttributes.call(this));
        this.containers.visitExpectationLegend.future.text = this.containers.visitExpectationLegend.future.g
            .append('text')
            .attr(textAttributes.call(this).attr)
            .style(textAttributes.call(this).style);
        this.containers.visitExpectationLegend.future.text
            .selectAll('tspan')
            .data(this.data.sets.future_visits)
            .enter()
            .append('tspan')
            .attr('fill', function(d) {
                return _this.data.sets.visit_status_col
                    .find(function(visit_status) {
                        return visit_status.split(':|:')[1] === d;
                    })
                    .split(':|:')[2];
            })
            .text(function(d, i) {
                return d;
            });
        this.containers.visitExpectationLegend.future.text.html(
            this.containers.visitExpectationLegend.future.text
                .html()
                .replace('</tspan><tspan', '</tspan>/<tspan')
        );
    }

    function addLegends() {
        addVisitStatusLegend.call(this);
        addVisitExpectationLegend.call(this);
    }

    function updateMultiSelects$1() {
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(d) {
                return d.multiple;
            })
            .selectAll('select')
            .attr('size', 2)
            .selectAll('option')
            .property('selected', true);
    }

    function init(data) {
        var _this = this;

        //Data manipulation
        loading.call(this, 'Data manipulation', function() {
            _this.data = {
                raw: data,
                analysis: data,
                filtered: data,
                transposed: [],
                variables: [],
                missingVariables: [],
                filters: [],
                sets: {},
                statistics: {}
            };
            addVariables.call(_this);
            checkRequiredVariables.call(_this);
            defineSets.call(_this);
            calculateVisitStatistics.call(_this);
            addVisitStatusStyles.call(_this);
            transposeData.call(_this);
            addLegends.call(_this);
            updateNParticipants.call(_this); //Display initialization

            loading.call(_this, 'Display initialization', function() {
                if (_this.settings.active_tab === 'Listing') {
                    _this.containers.visitExpectationLegendContainer.classed('pvl-hidden', true);

                    _this.containers.ordinalChart.classed('pvl-hidden', true);

                    _this.containers.linearChart.classed('pvl-hidden', true);

                    _this.containers.listing.classed('pvl-hidden', false); //initialize listing

                    _this.listing.init(_this.data.transposed, _this.test);
                } else if (_this.settings.active_tab === 'Charts') {
                    _this.containers.visitExpectationLegendContainer.classed('pvl-hidden', false);

                    _this.containers.charts.classed('pvl-hidden', false);

                    _this.containers.listing.classed('pvl-hidden', true); //initialize charts

                    _this.ordinalChart.init(_this.data.raw, _this.test);

                    _this.linearChart.init(_this.data.raw, _this.test);
                } else if (_this.settings.active_tab === 'Visit Chart') {
                    _this.containers.visitExpectationLegendContainer.classed('pvl-hidden', false);

                    _this.containers.ordinalChart.classed('pvl-hidden', false);

                    _this.containers.linearChart.classed('pvl-hidden', true);

                    _this.containers.listing.classed('pvl-hidden', true); //initialize ordinal chart

                    _this.ordinalChart.init(_this.data.raw, _this.test);
                } else if (_this.settings.active_tab === 'Study Day Chart') {
                    _this.containers.visitExpectationLegendContainer.classed('pvl-hidden', false);

                    _this.containers.visitExpectationLegend.past.rect.classed('pvl-hidden', true);

                    _this.containers.visitExpectationLegend.future.rect.classed('pvl-hidden', true);

                    _this.containers.ordinalChart.classed('pvl-hidden', true);

                    _this.containers.linearChart.classed('pvl-hidden', false);

                    _this.containers.listing.classed('pvl-hidden', true); //initialize linear chart

                    _this.linearChart.init(_this.data.raw, _this.test);
                }

                updateMultiSelects$1.call(_this);
                update$1.call(_this); //indicate that loading has completed

                if (_this.test) _this.loaded = true;
            });
        });
    }

    function destroy() {
        //Remove displays.
        this.ordinalChart.destroy();
        this.linearChart.destroy();
        this.listing.destroy(); //Remove stylesheet.

        this.style.remove(); //Clear container, removing one child node at a time.

        var node = d3.select(this.element).node();

        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function participantVisitListing() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var testingUtilities = arguments.length > 2 ? arguments[2] : undefined;
        //Instantiate central object.
        var pvl = {
            element: element,
            settings: {
                user: settings,
                rendererSettings: configuration.rendererSettings(),
                controlsSettings: configuration.controlsSettings(),
                ordinalChartSettings: configuration.ordinalChartSettings(),
                linearChartSettings: configuration.linearChartSettings(),
                listingSettings: configuration.listingSettings()
            },
            document: testingUtilities ? testingUtilities.dom.window.document : document,
            performance: testingUtilities ? testingUtilities.performance : performance,
            test: !!testingUtilities,
            init: init,
            destroy: destroy
        }; //Merge and sync user settings with default settings.

        pvl.settings.listingMerged = Object.assign(
            {},
            pvl.settings.listingSettings,
            pvl.settings.rendererSettings,
            pvl.settings.user
        );
        configuration.syncListingSettings.call(pvl);
        pvl.settings.ordinalChartMerged = Object.assign(
            {},
            pvl.settings.ordinalChartSettings,
            pvl.settings.user
        );
        configuration.syncOrdinalChartSettings.call(pvl);
        pvl.settings.linearChartMerged = Object.assign(
            {},
            pvl.settings.linearChartSettings,
            pvl.settings.user
        );
        configuration.syncLinearChartSettings.call(pvl);
        pvl.settings.controlsMerged = Object.assign(
            {},
            pvl.settings.controlsSettings,
            pvl.settings.user
        );
        configuration.syncControlsSettings.call(pvl);
        layout.call(pvl); // attaches containers object to central object ([pvl])

        styles.call(pvl); // attaches styles object to central object ([pvl])

        controls.call(pvl); // attaches Webcharts controls object to central object ([pvl])

        charts.ordinalChart.call(pvl); // attaches Webcharts chart object to central object ([pvl])

        charts.linearChart.call(pvl); // attaches Webcharts chart object to central object ([pvl])

        listing.call(pvl); // attaches Webcharts table object to central object ([pvl])

        return pvl;
    }

    return participantVisitListing;
});
