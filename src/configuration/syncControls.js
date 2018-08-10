export default function syncControls() {
    this.settings.controls.inputs.find(
        control => control.label === 'Site'
    ).value_col = this.settings.rendererSynced.site_col;
    this.settings.controls.inputs.find(
        control => control.label === 'Participant Status'
    ).value_col = this.settings.rendererSynced.id_status_col;
}
