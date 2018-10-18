export default function participant() {
    // create dictionary of id columns
    const idDict = d3
        .nest()
        .key(d => d[this.parent.settings.rendererSynced.id_col])
        .rollup(d => d)
        .map(this.parent.data.raw);

    // get all the cells
    const cells = this.table.selectAll('tbody tr').selectAll('td:nth-child(2)');

    // create ditionary of table cells
    const cellDict = d3
        .nest()
        .key(d => d[0].__data__.text)
        .rollup(d => d[0])
        .map(cells);

    // get ids
    const id_cols = d3
        .set(this.data.filtered.map(d => d[this.parent.settings.rendererSynced.id_col]))
        .values();

    id_cols.forEach(id => {
        const id_data = idDict[id];
        const id_summary = d3
            .nest()
            .key(d => d[this.parent.settings.rendererSynced.visit_status_col])
            .rollup(d => d3.format('%')(d.length / id_data.length))
            .entries(id_data);
        d3.select(cellDict[id][0]).attr(
            'title',
            id_summary.map(status => `${status.key} (${status.values})`).join('\n')
        );
    });
}
