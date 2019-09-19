import { createControls } from 'webcharts';

export default function controls() {
    this.controls = new createControls(
        this.containers.controls.node(),
        this.settings.controlsSynced
    );
}
