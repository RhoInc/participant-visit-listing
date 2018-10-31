export default function syncLinearChartSettings() {
    const listingSettings = this.settings.listingSynced;
    const linearChartSettings = this.settings.linearChartMerged;

    //Update linear chart settings.
    linearChartSettings.x.column = listingSettings.visit_day_col;
    linearChartSettings.y.column = listingSettings.id_col;
    const circles = linearChartSettings.marks.find(mark => mark.type === 'circle');
    circles.per = [
        listingSettings.id_col,
        listingSettings.visit_day_col,
    ];
    circles.tooltip = `[${listingSettings.id_col}] - [${listingSettings.visit_col}] ([${listingSettings.visit_date_col}]: Day [${listingSettings.visit_day_col}]): [${listingSettings.visit_status_col}]`;
    linearChartSettings.color_by = listingSettings.visit_status_col;

    //Assign settings to settings object.
    this.settings.linearChartSynced = linearChartSettings;
}
