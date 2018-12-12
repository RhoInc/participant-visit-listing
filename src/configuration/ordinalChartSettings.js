import commonChartSettings from './commonChartSettings';

export default function ordinalChartSettings() {
    const settings = commonChartSettings();
    settings.x.type = 'ordinal';
    settings.x.label = 'Visit';
    settings.marks[1].values.unscheduled = [false];

    return settings;
}
