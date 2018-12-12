import commonChartSettings from './commonChartSettings';

export default function linearChartSettings() {
    const settings = commonChartSettings();
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
