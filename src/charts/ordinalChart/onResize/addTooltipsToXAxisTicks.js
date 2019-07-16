import { nest, format } from 'd3';

export default function addTooltipsToXAxisTicks() {
    this.wrap.selectAll('.pvl-x-tooltip').remove();
    this.wrap
        .selectAll('.x.axis .tick')
        .append('title')
        .classed('pvl-x-tooltip', true)
        .text(d => {
            const visit_data = this.pvl.data.filtered.filter(
                di => di[this.pvl.settings.visit_col] === d
            );
            const visit_summary = nest()
                .key(d => d[this.pvl.settings.visit_status_col])
                .rollup(d => format('%')(d.length / visit_data.length))
                .entries(visit_data);
            return `${d}\n - ${visit_summary
                .map(status => `${status.key} (${status.values})`)
                .join('\n - ')}`;
        });
}
