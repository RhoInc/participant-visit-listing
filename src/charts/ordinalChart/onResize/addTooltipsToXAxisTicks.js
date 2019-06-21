export default function addTooltipsToXAxisTicks() {
    this.wrap
        .selectAll('.x.axis .tick')
        .append('title')
        .text(d => this.pvl.data.statistics.visits[d].tooltip);
}
