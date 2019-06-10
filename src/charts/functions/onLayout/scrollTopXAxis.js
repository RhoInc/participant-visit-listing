export default function scrollTopXAxis() {
    const context = this;
    const div_top = this.topXAxis.container.node().getBoundingClientRect().top;

    window.addEventListener('scroll', function() {
        const window_top = window.scrollY - 0;
        console.log(window_top);
        if (window_top > div_top) {
            if (!context.topXAxis.container.classed('pvl-sticky'))
                context.topXAxis.container.classed('pvl-sticky', true);
        } else {
            context.topXAxis.container.classed('pvl-sticky', false);
        }
    });
}
