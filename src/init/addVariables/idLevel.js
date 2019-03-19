export default function idLevel() {
    //Derive ID-level variables.
    this.data.ids = d3
        .nest()
        .key(d => d[this.settings.id_col])
        .rollup(d => {
            const nOverdue = d.filter(di => di.overdue).length;
            d.forEach(di => {
                di.nOverdue = nOverdue.toString();
            });
            return d;
        })
        .map(this.data.analysis);
}
