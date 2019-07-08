import { nest, format } from 'd3';

export default function visit() {
    this.pvl.data.sets.visit_col.forEach(visit => {
        const visit_data = this.pvl.data.filtered.filter(
            d => d[this.pvl.settings.visit_col] === visit.name
        );
        const visit_summary = nest()
            .key(d => d[this.pvl.settings.visit_status_col])
            .rollup(d => format('%')(d.length / visit_data.length))
            .entries(visit_data);
        const visit_cell = this.table
            .selectAll('thead tr')
            .selectAll('th:not(:first-child)')
            .filter(d => d === visit.name);
        visit_cell.attr(
            'title',
            `${visit.name}\n - ${visit_summary
                .map(status => `${status.key} (${status.values})`)
                .join('\n - ')}`
        );
        if (this.pvl.settings.abbreviate_visits)
            visit_cell.text(d => {
                const abbreviation = this.pvl.data.sets.visit_col.find(visit => visit.name === d)
                    .abbreviation;
                return abbreviation !== 'undefined'
                    ? this.pvl.data.sets.visit_col.find(visit => visit.name === d).abbreviation
                    : d;
            });
    });
}
