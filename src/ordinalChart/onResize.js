export default function onResize() {
    this.legend.remove();

    //Draw top x-axis.
    this.topXAxis = d3.svg
        .axis()
        .scale(this.x)
        .orient('top')
        .ticks(this.xAxis.ticks()[0])
        .tickFormat(this.config.x_displayFormat)
        .innerTickSize(this.xAxis.innerTickSize())
        .outerTickSize(this.xAxis.outerTickSize()),
    this.topXAxisG.call(this.topXAxis);
    this.topXAxisG
        .select('text.axis-title--top')
        .attr({
            transform: 'translate(' + this.plot_width / 2 + ',' + -this.margin.top / 2 + ')',
            'text-anchor': 'middle'
        })
        .text(this.config.x.label);
}
