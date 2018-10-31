export default function ordinalChartSettings() {
    return {
        x: {
            type: 'ordinal',
            label: 'Visit',
            value_col: null, // set in ./syncOrdinalSettings.js
            order: null, // set in ../init/defineSets/defineVisitSet.js
        },
        y: {
            type: 'ordinal',
            label: 'Participant ID',
            value_col: null, // set in ./syncOrdinalSettings.js
        },
        marks: [
            {
                type: 'circle',
                per: null, // set in ./syncOrdinalSettings.js
                tooltip: null, // set in ./syncOrdinalSettings.js
                radius: 4,
                attributes: {
                    'fill-opacity': 1,
                },
            },
		],
		color_by: null, // set in ./syncOrdinalSettings.js
		color_dom: null, // set in ../init/defineSets/defineVisitStatusSet.js
		legend: {
            location: 'top',
            label: 'Visit Status',
            order: null, // set in ../init/defineSets/defineVisitStatusSet.js
        },
        gridlines: 'y',
        range_band: 15,
    };
}
