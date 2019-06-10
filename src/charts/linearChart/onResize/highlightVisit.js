import { select } from 'd3';

export default function highlightVisit() {
    const context = this;

    this.marks
        .filter(mark => mark.type === 'circle')
        .forEach(mark => {
            mark.groups
                .on('click', d => {
                    this.svg.selectAll('.pvl-highlighted-visit').remove();
                    console.log(d);
                    this.highlightedVisit = d.values.raw[0][this.pvl.settings.visit_col];
                    this.svg
                        .selectAll('.point circle')
                        .attr({
                            'stroke-opacity': .5,
                            'fill-opacity': .5,
                        });
                    this.svg
                        .selectAll('.point')
                        .filter(di => di.values.raw[0][this.pvl.settings.visit_col] === this.highlightedVisit)
                        .each(function(di) {
                            const point = d3.select(this);
                            point.insert('line', ':first-child')
                                .classed('pvl-highlighted-visit', true)
                                .attr({
                                    x1: context.x(di.values.x),
                                    x2: context.x(di.values.x),
                                    y1: context.y(di.values.y),
                                    y2: context.y(di.values.y) + context.y.rangeBand(),
                                    stroke: 'black',
                                    'stroke-width': '3px',
                                    'stroke-linecap': 'square',
                                });
                            point.select('circle')
                                .attr({
                                    'fill-opacity': 1,
                                    'stroke-opacity': 1,
                                });
                        });
                });
        });
}
