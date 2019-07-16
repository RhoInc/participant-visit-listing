export default function addTopScrollBar() {
    this.scrollBars = {};
    this.scrollBars.upper_outer = this.pvl.containers.listing
        .insert('div', ':first-child')
        .classed('pvl-scroll-bar pvl-scroll-bar--upper pvl-scroll-bar--outer', true);
    this.scrollBars.upper_inner = this.scrollBars.upper_outer
        .append('div')
        .classed('pvl-scroll-bar pvl-scroll-bar--upper pvl-scroll-bar--inner', true);
    this.scrollBars.lower_outer = this.pvl.containers.listing
        .insert('div', '.wc-chart')
        .classed('pvl-scroll-bar pvl-scroll-bar--lower pvl-scroll-bar--outer', true);
    this.scrollBars.lower_inner = this.wrap.classed(
        'pvl-scroll-bar pvl-scroll-bar--lower pvl-scroll-bar--inner',
        true
    );
    this.scrollBars.lower_outer.node().appendChild(this.scrollBars.lower_inner.node());
}
