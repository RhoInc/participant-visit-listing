export default function scrolling() {
    const context = this;
    const div_top = this.topXAxis.container.node().getBoundingClientRect().top;
    console.log(div_top);

    window.addEventListener('scroll', function() {
        const window_top = window.scrollY - 0;
        console.log(window_top);
        if (window_top > div_top) {
            console.log('window greater');
            if (!context.topXAxis.container.classed('pvl-sticky'))
                context.topXAxis.container.classed('pvl-sticky', true);
        } else {
            console.log('div greater');
            context.topXAxis.container.classed('pvl-sticky', false);
        }
    });
}
