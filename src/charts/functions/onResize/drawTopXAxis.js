import { svg, format } from 'd3';

export default function drawTopXAxis() {
    //Set width and height of floating x-axis.
    this.topXAxis.container.select('svg').attr({
        width: this.wrap.select('.wc-svg').attr('width'),
        height: '100px'
    });

    //Draw top x-axis.
    this.topXAxis.axis = svg
        .axis()
        .scale(this.x)
        .orient('top')
        .ticks(this.xAxis.ticks()[0])
        .innerTickSize(this.xAxis.innerTickSize())
        .outerTickSize(this.xAxis.outerTickSize());
    if (this.config.x.type === 'linear')
        this.topXAxis.axis.tickFormat(format(this.config.x.format));
    this.topXAxis.svg
        .attr({
            transform: `translate(${this.margin.left},${this.pvl.settings.chart_margin.top})`
        })
        .call(this.topXAxis.axis);
    this.topXAxis.label
        .attr({
            transform: `translate(${this.plot_width / 2},-${this.pvl.settings.chart_margin.top -
                25})`,
            'text-anchor': 'middle'
        })
        .text(`Schedule of Events by ${this.config.x.label}`);
}
