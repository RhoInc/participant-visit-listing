export default function onPreprocess() {
    this.config.y.domain = this.pvl.data.sets.id_col.slice().reverse();
}
