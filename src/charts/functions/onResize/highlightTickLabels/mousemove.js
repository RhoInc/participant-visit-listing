import { mouse as d3mouse } from 'd3';

export default function mousemove(mouse) {
    const coords = d3mouse(mouse);

    //x
    const x = coords[0];
    if (this.config.x.type === 'ordinal') {
        const x_coord = this.x_coords.find(
            x_coord => x_coord.coord <= x && x < x_coord.coord + this.x.rangeBand()
        );
        if (x_coord) {
            this.wrap.selectAll('.x.axis .tick line').style({
                stroke: d => (d === x_coord.value ? 'black' : '#eee'),
                'stroke-width': d => (d === x_coord.value ? 2 : 1)
            });
            this.wrap
                .selectAll('.x.axis .tick text')
                .attr('font-weight', d => (d === x_coord.value ? 'bold' : 'normal'));
        }
    } else {
        this.topXAxis.svg.select('.tick--highlight').remove();
        if (x > 0)
            this.topXAxis.svg
                .append('g')
                .classed('tick tick--highlight', true)
                .append('text')
                .classed('pvl-highlight-x-tick-label', true)
                .attr({
                    x: x,
                    y: -9,
                    'text-anchor': 'middle'
                })
                .style({
                    'font-weight': 'bold'
                })
                .text(Math.round(this.x.invert(x)));
    }

    //y
    const y = coords[1];
    const y_coord = this.y_coords.find(
        y_coord => y_coord.coord <= y && y < y_coord.coord + this.y.rangeBand()
    );
    if (y_coord) {
        this.wrap.selectAll('.y.axis .tick line').style({
            stroke: d => (d === y_coord.value ? 'black' : '#eee'),
            'stroke-width': d => (d === y_coord.value ? 2 : 1)
        });
        this.wrap
            .selectAll('.y.axis .tick text')
            .attr('font-weight', d => (d === y_coord.value ? 'bold' : 'normal'));
    }
}
