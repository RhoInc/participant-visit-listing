export default function syncScrollBars() {
    const context = this;

    this.scrollBars.upper_outer.on('scroll', function() {
        context.scrollBars.lower_outer.node().scrollLeft = this.scrollLeft;
    });
    this.scrollBars.lower_outer.on('scroll', function() {
        context.scrollBars.upper_outer.node().scrollLeft = this.scrollLeft;
    });
    this.scrollBars.upper_inner.style('width', `${this.table.node().offsetWidth}px`);
    this.scrollBars.lower_inner.style('width', `${this.table.node().offsetWidth}px`);
}
