export default function commonChartSettings() {
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
            behavior: 'flex',
            sort: 'alphabetical-descending'
        },
        marks: [
            {
                type: 'circle',
                per: null, // set in ./syncOrdinalChartSettings and ./syncLinearSettings.js
                tooltip: null, // set in ./syncOrdinalChartSettings and ./syncLinearSettings.js
                radius: 5,
                attributes: {
                    'fill-opacity': 1
                },
                values: {}
            },
            {
                type: 'circle',
                per: null, // set in ./syncOrdinalChartSettings and ./syncOrdinalSettings.js
                tooltip: null, // set in ./syncOrdinalChartSettings and ./syncOrdinalSettings.js
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
        color_by: null, // set in ./syncOrdinalChartSettings and ./syncLinearSettings.js
        color_dom: null, // set in ../init/defineSets/defineVisitStatusSet.js
        legend: {
            location: 'top',
            label: 'Visit Status',
            order: null // set in ../init/defineSets/defineVisitStatusSet.js
        },
        gridlines: 'y',
        padding: 0,
        scale_text: false,
        resizable: false
    };
}
