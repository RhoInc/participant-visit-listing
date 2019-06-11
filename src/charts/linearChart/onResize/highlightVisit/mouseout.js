import { select } from 'd3';

export default function mouseout(element, d) {
    const mark = select(element).selectAll('.wc-data-mark');
    if (mark.node().tagName !== 'text')
        mark.attr({
            'stroke': this.colorScale(d.values.raw[0][this.pvl.settings.visit_status_col]),
        });
    else
        this.marks[0].circles
            .filter(di => di.key === d.key)
            .attr({
                'stroke': this.colorScale(d.values.raw[0][this.pvl.settings.visit_status_col]),
            });
}
