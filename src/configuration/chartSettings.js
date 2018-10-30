export default function chartSettings() {
    return {
        x: {type: 'time',
            label: 'Visit Date',
            value_col: null, // set in ./syncSettings.js
            format: '%b %y',
        },
        y: {type: 'ordinal',
            label: 'Participant ID',
            value_col: null, // set in ./syncSettings.js
        },
        marks: [
            {
                type: 'circle',
                per: null, // set in ./syncSettings.js
                tooltip: null, // set in ./syncSettings.js
                radius: 4,
                attributes: {
                    'fill-opacity': 1,
                },
            },
		],
		color_by: null, // set in ./syncSettings.js
		color_dom: null, // set in ../init/defineSets/defineVisitStatusSet.js
		legend: {
            location: 'top',
            label: 'Visit Status',
            order: null, // set in ../init/defineSets/defineVisitStatusSet.js
        },
        date_format: null, // set in ./syncSettings.js
        gridlines: 'y',
        range_band: 15,
    };
}
