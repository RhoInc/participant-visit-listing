export default function addTopXAxis() {
    this.topXAxis = {
        container: this.svg.append('g').classed('x x--top axis ordinal', true)
    };
    this.topXAxis.label = this.topXAxis.container
        .append('text')
        .classed('axis-title axis-title--top', true);
}
