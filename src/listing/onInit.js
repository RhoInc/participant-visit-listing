import defineColumns from './onInit/defineColumns';

export default function onInit() {
    this.initialized = true;
    this.data.initial = this.data.raw.slice();
    this.controls.init(this.pvl.data.raw); // gotta pass the raw data to the controls
    defineColumns.call(this);
}
