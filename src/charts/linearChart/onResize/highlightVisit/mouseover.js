import { select } from 'd3';

export default function mouseover(element, d) {
    const mark = select(element).selectAll('.wc-data-mark');
    if (mark.node().tagName !== 'text')
        mark.attr({
            stroke: 'black'
        });
    else
        this.marks[0].circles
            .filter(di => di.key === d.key)
            .attr({
                stroke: 'black'
            });
}
