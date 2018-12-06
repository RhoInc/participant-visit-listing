export default function defineDefaultSet(col) {
    this.data.sets[col] = d3
        .set(this.data.filtered.map(d => d[this.settings[col]]))
        .values()
        .sort();

    //Sort set numerically if possible.
    if (this.data.sets[col].every(value => !isNaN(parseFloat(value.replace(/[^0-9.]/g, '')))))
        this.data.sets[col].sort(
            (a, b) => parseFloat(a.replace(/[^0-9.]/g, '')) - parseFloat(b.replace(/[^0-9.]/g, ''))
        );
}
