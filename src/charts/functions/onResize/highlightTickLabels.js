export default function highlightTickLabels() {
    const context = this;

    this.x_coords = this.x_dom
        .map(value => {
            return {
                value,
                coord: this.x(value),
            };
        });

    this.y_coords = this.y_dom
        .map(value => {
            return {
                value,
                coord: this.y(value),
            };
        });

    this.overlay.style('pointer-events', null);

    this.svg.on('mouseover', function() {
        const coords = d3.mouse(this);

        //x
        const x = coords[0];
        if (context.config.x.type === 'ordinal') {
            const x_coord = context.x_coords
                .find(x_coord => x_coord.coord <= x && x < (x_coord.coord + context.x.rangeBand()));
            if (x_coord) {
                context.wrap
                    .selectAll('.x.axis .tick text')
                    .attr('font-weight', d => d === x_coord.value ? 'bold' : 'normal');
            }
        } else {
            context.topXAxis.svg.select('.pvl-highlight-x-tick-label').remove();
            context.topXAxis.svg
                .append('text')
                .classed('pvl-highlight-x-tick-label', true)
                .attr({
                    x: x,
                    y: 0,
                })
                .text(Math.round(context.x.invert(x)));
        }

        //y
        const y = coords[1];
        const y_coord = context.y_coords
            .find(y_coord => y_coord.coord <= y && y < (y_coord.coord + context.y.rangeBand()));
        if (y_coord) {
            context.wrap
                .selectAll('.y.axis .tick text')
                .attr('font-weight', d => d === y_coord.value ? 'bold' : 'normal');
        }
    });
}
