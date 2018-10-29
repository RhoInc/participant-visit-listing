export default function defineDefaultSet(col) {
    this.data.sets[col] = d3
        .set(this.data.filtered.map(d => d[this.settings[col]]))
        .values()
        .sort();
}
