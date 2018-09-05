export default function syncControls() {
    //Sync site filter.
    const siteFilter = this.settings.controls.inputs.find(control => control.label === 'Site');
    siteFilter.value_col = this.settings.rendererSynced.site_col;

    //Sync ID status filter.
    const idStatusFilter = this.settings.controls.inputs.find(
        control => control.label === 'Participant Status'
    );
    idStatusFilter.value_col = this.settings.rendererSynced.id_status_col;

    this.settings.controlsSynced = this.settings.controls;
}
