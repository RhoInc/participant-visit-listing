export default function participant() {
    // create dictionary of id columns
    const chart = this;
    const idDict = d3
        .nest()
        .key(d => d[chart.parent.settings.rendererSynced.id_col])
        .rollup(d => d)
        .map(chart.parent.data.raw);

    // get all the cells
    const cells = chart.table.selectAll('tbody tr').selectAll('td:nth-child(2)');

    // Store the appropriate td cell within the first row of for each subject's nested data
    Object.keys(idDict).map(function(objectKey, index) {
        idDict[objectKey][0].cell = cells[index][0];
    });

    this.parent.data.sets.id_col.forEach(id => {
        const id_data = idDict[id];
        const id_summary = d3
            .nest()
            .key(d => d[this.parent.settings.rendererSynced.visit_status_col])
            .rollup(d => d3.format('%')(d.length / id_data.length))
            .entries(id_data);
        const id_cell = idDict[id][0].cell;
        d3.select(id_cell).attr(
            'title',
            id_summary.map(status => `${status.key} (${status.values})`).join('\n')
        );
    });
}
