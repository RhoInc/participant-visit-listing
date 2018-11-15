export default function onLayout() {
    this.topXAxis = {
        container: this.svg.append('g').classed('x x--top axis ordinal', true),
    };
    this.topXAxis.label = this.topXAxis.container
        .append('text').classed('axis-title axis-title--top', true);
    this.topXAxis.minimize = this.topXAxis.container
        .append('text')
        .classed('pvl-chart-button pvl-chart-button--minimize', true)
        .html('&minus;<title>Minimize chart</title')
        .attr('title', 'Minimize chart');
    this.topXAxis.maximize = this.topXAxis.container
        .append('text')
        .classed('pvl-chart-button pvl-chart-button--maximize', true)
        .html('&plus;<title>Maximize chart')
        .attr('title', 'Maximize chart');
    this.bottomXAxis = {
        container: this.svg.select('.x.axis').classed('x--bottom', true),
    };
}
