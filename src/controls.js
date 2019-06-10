import { createControls } from 'webcharts';

export default function controls() {
    const context = this;

    //Define controls.
    this.controls = new createControls(
        this.containers.controls.node(),
        this.settings.controlsSynced
    );
}
