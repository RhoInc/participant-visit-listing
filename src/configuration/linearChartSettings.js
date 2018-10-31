export default function chartSettings() {
    return {
        x: {
            type: 'linear',
            label: 'Visit Day',
            value_col: null, // set in ./syncLinearSettings.js
        },
        y: {
            type: 'ordinal',
            label: 'Participant ID',
            value_col: null, // set in ./syncLinearSettings.js
        },
        marks: [
            {
                type: 'circle',
                per: null, // set in ./syncLinearSettings.js
                tooltip: null, // set in ./syncLinearSettings.js
                radius: 4,
                attributes: {
                    'fill-opacity': 1,
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
        range_band: 15,
    };
}
