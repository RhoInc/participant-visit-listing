export default function syncOrdinalChartSettings() {
    const listingSettings = this.settings.listingSynced;
    const ordinalChartSettings = this.settings.ordinalChartMerged;

    //Update ordinal chart settings.
    ordinalChartSettings.x.column = listingSettings.visit_col;
    ordinalChartSettings.y.column = listingSettings.id_col;
    const circles = ordinalChartSettings.marks[0];
    circles.per = [listingSettings.id_col, listingSettings.visit_col];
    circles.tooltip = `[${listingSettings.id_col}] - [${listingSettings.visit_col}] ([${
        listingSettings.visit_date_col
    }]: Day [${listingSettings.visit_day_col}]): [${listingSettings.visit_status_col}]`;
    const expectedCircles = ordinalChartSettings.marks[1];
    expectedCircles.per = [listingSettings.id_col, listingSettings.visit_col];
    expectedCircles.tooltip = `[${listingSettings.id_col}] - [${listingSettings.visit_col}] ([${
        listingSettings.visit_date_col
    }]: Day [${listingSettings.visit_day_col}]): [${listingSettings.visit_status_col}]`;
    ordinalChartSettings.color_by = listingSettings.visit_status_col;
    ordinalChartSettings.margin = Object.assign({}, listingSettings.chart_margin);
    ordinalChartSettings.margin.top = 0;
    ordinalChartSettings.margin.right = ordinalChartSettings.margin.right || 40;

    //Assign settings to settings object.
    this.settings.ordinalChartSynced = ordinalChartSettings;
}
