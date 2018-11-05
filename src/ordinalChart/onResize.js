export default function onResize() {
    this.legend.remove();

    //Draw top x-axis.
    (this.topXAxis = d3.svg
        .axis()
        .scale(this.x)
        .orient('top')
        .ticks(this.xAxis.ticks()[0])
        .tickFormat(this.config.x_displayFormat)
        .innerTickSize(this.xAxis.innerTickSize())
        .outerTickSize(this.xAxis.outerTickSize())),
        this.topXAxisG.call(this.topXAxis);
    this.topXAxisG
        .select('text.axis-title--top')
        .attr({
            transform: 'translate(' + this.plot_width / 2 + ',' + -(this.margin.top - 20) + ')',
            'text-anchor': 'middle'
        })
        .text(`Schedule of Events by ${this.config.x.label}`);

    //Rotate top x-axis tick labels.
    const topXAxisTickLabels = this.topXAxisG.selectAll('.tick text');
    topXAxisTickLabels
        .attr({
            transform: 'rotate(-45)'
        })
        .style('text-anchor', 'start');

    //Rotate bottom x-axis tick labels.
    const bottomXAxisTickLabels = this.bottomXAxisG.selectAll('.tick text');
    bottomXAxisTickLabels
        .attr({
            transform: 'rotate(-45)'
        })
        .style('text-anchor', 'end');
}
