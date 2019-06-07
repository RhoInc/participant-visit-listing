export default function addTopXAxis() {
    this.topXAxis = {
        container: this.wrap.insert('div', ':first-child').classed('pvl-floating-axis', true).style('height', '100px'),
    };
    this.topXAxis.svg = this.topXAxis.container
        .append('svg')
        .append('g')
        .classed('x x--top axis ordinal', true);
    this.topXAxis.label = this.topXAxis.svg
        .append('text')
        .classed('axis-title axis-title--top', true);
}
