export default function participant() {
    this.parent.data.sets.id_col.forEach(id => {
        const id_data = this.parent.data.raw.filter(
            d => d[this.parent.settings.rendererSynced.id_col] === id
        );
        const id_summary = d3
            .nest()
            .key(d => d[this.parent.settings.rendererSynced.visit_status_col])
            .rollup(d => d3.format('%')(d.length / id_data.length))
            .entries(id_data);
        const id_cell = this.table
            .selectAll('tbody tr')
            .selectAll('td:first-child')
            .filter(d => d.text.indexOf(id) > -1) // define a more rigid selector here
            .filter((d, i) => i === 0);
        id_cell.attr(
            'title',
            id_summary.map(status => `${status.key} (${status.values})`).join('\n')
        );
    });
}
