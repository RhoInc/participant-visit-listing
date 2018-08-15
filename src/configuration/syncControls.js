export default function syncControls() {
    this.settings.controls.inputs.find(
        control => control.label === 'Site'
    ).value_col = 'site'; //this.settings.rendererSynced.site_col;
    this.settings.controls.inputs.find(
        control => control.label === 'Participant Status'
    ).value_col = 'id_status'; //this.settings.rendererSynced.id_status_col;
    this.settings.controlsSynced = this.settings.controls;
}
