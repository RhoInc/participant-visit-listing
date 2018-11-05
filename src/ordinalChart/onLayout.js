export default function onLayout() {
    this.bottomXAxisG = this.svg.select('.x.axis').classed('x--bottom', true);
    this.topXAxisG = this.svg.append('g').classed('x x--top axis ordinal', true);
    this.topXAxisG.append('text').classed('axis-title axis-title--top', true);
}
