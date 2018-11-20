export default function syncControlsSettings() {
    const listingSettings = this.settings.listingSynced;
    const controlsSettings = this.settings.controlsMerged;

    //Sync site filter.
    const siteFilter = controlsSettings.inputs.find(control => control.label === 'Site');
    siteFilter.value_col = listingSettings.site_col;

    //Sync ID status filter.
    const idStatusFilter = controlsSettings.inputs.find(
        control => control.label === 'Participant Status'
    );
    idStatusFilter.value_col = listingSettings.id_status_col;

    //Add user-specified filters.
    if (Array.isArray(listingSettings.filter_cols) && listingSettings.filter_cols) {
        const labels = {
            subset1: 'Analysis Subset 1',
            subset2: 'Analysis Subset 2',
            subset3: 'Analysis Subset 3',
            overdue2: '>1 Overdue Visits'
        };
        listingSettings.filter_cols.forEach(filter_col => {
            controlsSettings.inputs.push({
                type: 'subsetter',
                label: labels[filter_col] || filter_col,
                value_col: filter_col
            });
        });
    }
    listingSettings.filter_cols.splice(0, 0, siteFilter.value_col);
    listingSettings.filter_cols.splice(1, 0, idStatusFilter.value_col);

    this.settings.controlsSynced = controlsSettings;
    Object.assign(this.settings, controlsSettings);
}
