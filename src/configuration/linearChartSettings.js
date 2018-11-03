export default function chartSettings() {
    return {
        x: {
            type: 'linear',
            label: 'Study Day',
            value_col: null, // set in ./syncLinearSettings.js
        },
        y: {
            type: 'ordinal',
            label: '',
            value_col: null, // set in ./syncLinearSettings.js
            range_band: 15,
            behavior: 'flex',
        },
        marks: [
            {
                type: 'circle',
                per: null, // set in ./syncLinearSettings.js
                tooltip: null, // set in ./syncLinearSettings.js
                radius: 5,
                attributes: {
                    'fill-opacity': 1,
                },
            },
            {
                type: 'circle',
                per: null, // set in ./syncOrdinalSettings.js
                tooltip: null, // set in ./syncOrdinalSettings.js
                radius: 3,
                attributes: {
                    'fill-opacity': 1,
                    'fill': 'white',
                },
                values: {
                    expected: [true],
                },
            },
            {
                type: 'text',
                per: null, // set in ./syncLinearSettings.js
                tooltip: null, // set in ./syncLinearSettings.js
                text: '[visitCharacter]',
                attributes: {
                    'font-size': '10px',
                    'font-weight': 'bold',
                    dx: 3,
                    dy: -3,
                    cursor: 'default',
                },
                values: {
                    unscheduled: [true]
                },
            },
		],
		color_by: null, // set in ./syncLinearSettings.js
		color_dom: null, // set in ../init/defineSets/defineVisitStatusSet.js
		legend: {
            location: 'top',
            label: 'Visit Status',
            order: null, // set in ../init/defineSets/defineVisitStatusSet.js
        },
        gridlines: 'y',
        scale_text: false,
        margin: {
            top: 75,
        },
    };
}
