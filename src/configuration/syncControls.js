export default function syncControls() {
    //Sync site filter.
    const siteFilter = this.settings.controls.inputs.find(control => control.label === 'Site');
    siteFilter.value_col = this.settings.rendererSynced.site_col;

    //Sync ID status filter.
    const idStatusFilter = this.settings.controls.inputs.find(
        control => control.label === 'Participant Status'
    );
    idStatusFilter.value_col = this.settings.rendererSynced.id_status_col;

    //Add user-specified filters.
    if (
        Array.isArray(this.settings.rendererSynced.filter_cols) &&
        this.settings.rendererSynced.filter_cols
    ) {
        const labels = {
            subset1: 'Analysis Subset 1',
            subset2: 'Analysis Subset 2',
            subset3: 'Analysis Subset 3',
            overdue2: '>1 Overdue Visits'
        };
        this.settings.rendererSynced.filter_cols.forEach(filter_col => {
            this.settings.controls.inputs.push({
                type: 'subsetter',
                label: labels[filter_col] || filter_col,
                value_col: filter_col
            });
        });
    }

    this.settings.controlsSynced = this.settings.controls;
}
