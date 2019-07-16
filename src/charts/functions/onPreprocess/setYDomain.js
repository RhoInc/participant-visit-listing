export default function setYDomain() {
    this.config.y.domain = this.pvl.data.sets.id_col.slice().reverse();
}
