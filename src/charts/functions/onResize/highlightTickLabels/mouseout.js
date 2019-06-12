export default function mousemove(mouse) {
    //x
    if (this.config.x.type === 'ordinal') {
        this.wrap
            .selectAll('.x.axis .tick text')
            .attr('font-weight', 'normal');
    } else {
        this.topXAxis.svg.select('.pvl-highlight-x-tick-label').remove();
    }

    //y
    this.wrap
        .selectAll('.y.axis .tick text')
        .attr('font-weight', 'normal');
}
