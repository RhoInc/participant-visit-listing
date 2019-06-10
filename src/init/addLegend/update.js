import { format } from 'd3';

export default function update() {
    const denominator = this.data.filtered.filter(
        d =>
            this.data.sets.legend
                .map(d => d.split(':|:')[1])
                .indexOf(d[this.settings.visit_status_col]) > -1
    ).length;
    this.containers.legendItems.select('.pvl-legend-item-label').text(d => {
        const numerator = this.data.filtered.filter(
            di => di[this.settings.visit_status_col] === d[1]
        ).length;
        return `${d[1]} (${denominator > 0 ? format('%')(numerator / denominator) : 'N/A'})`;
    });
}
