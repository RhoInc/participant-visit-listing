export default function syncChartSettings() {
    const listingSettings = this.settings.listingSynced;
    const chartSettings = this.settings.chartMerged;

    //Update chart settings.
    chartSettings.x.column = listingSettings.visit_date_col;
    chartSettings.x.label = 'Visit Date';
    chartSettings.y.column = listingSettings.id_col;
    chartSettings.y.label = 'Participant ID';
    const circles = chartSettings.marks.find(mark => mark.type === 'circle');
    circles.per = [
        listingSettings.id_col,
        listingSettings.visit_date_col,
    ];
    circles.tooltip = `[${listingSettings.id_col}] - [${listingSettings.visit_col}] ([visitDate]): [${listingSettings.visit_status_col}]`;
    chartSettings.color_by = listingSettings.visit_status_col;
    chartSettings.date_format = listingSettings.date_format;

    //Assign settings to settings object.
    this.settings.chartSynced = chartSettings;
    Object.assign(this.settings, chartSettings);
}
