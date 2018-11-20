import updateLegend from './init/addLegend/update';

export default function controls() {
    const context = this;

    //Define controls.
    this.controls = new webCharts.createControls(
        this.containers.controls.node(),
        this.settings.controlsSynced
    );
}
