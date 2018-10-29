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
            },
		],
		color_by: null, // set in ./syncSettings.js
		color_dom: null, // set in ../init/defineSets/defineVisitStatusSet.js
		legend: {
            label: 'Visit Status',
            order: null, // set in ../init/defineSets/defineVisitStatusSet.js
        },
        date_format: null, // set in ./syncSettings.js
    };
}
