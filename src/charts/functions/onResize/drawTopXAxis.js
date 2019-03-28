export default function drawTopXAxis() {
    //Draw top x-axis.
    this.topXAxis.axis = d3.svg
        .axis()
        .scale(this.x)
        .orient('top')
        .ticks(this.xAxis.ticks()[0])
        .innerTickSize(this.xAxis.innerTickSize())
        .outerTickSize(this.xAxis.outerTickSize());
    if (this.config.x.type === 'linear')
        this.topXAxis.axis.tickFormat(d3.format(this.config.x.format));
    this.topXAxis.container.call(this.topXAxis.axis);
    this.topXAxis.label
        .attr({
            transform: 'translate(' + this.plot_width / 2 + ',' + -(this.margin.top - 20) + ')',
            'text-anchor': 'middle'
        })
        .text(`Schedule of Events by ${this.config.x.label}`);
}
