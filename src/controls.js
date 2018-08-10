export default function controls() {
    //Define controls.
    this.controls = new webCharts.createControls(
        this.containers.controls.node(),
        this.settings.controlsSynced
    );
}
