export default function getItHeated() {
    const context = this;

    this.marks[0].groups.each(function(d) {
        const group = d3.select(this);
        group.select('rect.pvl-heat-rect').remove();
        d.heat = group
            .append('rect')
            .classed('pvl-heat-rect', true)
            .attr({
                x: context.x(d.values.x),
                y: context.y(d.values.y),
                width: context.x.rangeBand(),
                height: context.y.rangeBand(),
                fill: context.colorScale(d.values.raw[0][context.config.color_by]),
                stroke: '#aaa',
                'stroke-width': 0.5
            });
    });
}
