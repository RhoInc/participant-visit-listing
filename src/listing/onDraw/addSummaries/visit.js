export default function visit() {
    this.pvl.data.sets.visit_col.forEach(visit => {
        const visit_data = this.pvl.data.raw.filter(d => d[this.pvl.settings.visit_col] === visit);
        const visit_summary = d3
            .nest()
            .key(d => d[this.pvl.settings.visit_status_col])
            .rollup(d => d3.format('%')(d.length / visit_data.length))
            .entries(visit_data);
        const visit_cell = this.table
            .selectAll('thead tr')
            .selectAll('th:not(:first-child)')
            .filter(d => d === visit);
        visit_cell.attr(
            'title',
            visit_summary.map(status => `${status.key} (${status.values})`).join('\n')
        );
    });
}
