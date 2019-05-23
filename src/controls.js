import { createControls } from 'webcharts';

export default function controls() {
    const context = this;

    //Define controls.
    this.controls = createControls(this.containers.controls.node(), this.settings.controlsSynced);
}
