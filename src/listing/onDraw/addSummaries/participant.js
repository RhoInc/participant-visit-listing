export default function participant() {
    // create dictionary of id columns
    const chart = this;
    const newNest = d3
        .nest()
        .key(d => d[chart.parent.settings.rendererSynced.id_col])
        .rollup(d => d)
        .map(chart.parent.data.raw); //filtered_data?

    // get all the cells
    const cells = chart.table.selectAll('tbody tr').selectAll('td:nth-child(2)');

    // Store the appropriate td cell within the first row of for each subject's nested data
    Object.keys(newNest).map(function(objectKey, index) {
        newNest[objectKey][0].cell = cells[index][0];
    });

    this.parent.data.sets.id_col.forEach(id => {
        const id_data = newNest[id];
        const id_summary = d3
            .nest()
            .key(d => d[this.parent.settings.rendererSynced.visit_status_col])
            .rollup(d => d3.format('%')(d.length / id_data.length))
            .entries(id_data);
        const id_cell = newNest[id][0].cell;
        d3.select(id_cell).attr(
            'title',
            id_summary.map(status => `${status.key} (${status.values})`).join('\n')
        );
    });
}
