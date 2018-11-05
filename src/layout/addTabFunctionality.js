export default function addTabFunctionality() {
    const context = this;

    this.containers.tabs.on('click', function(d) {
        context.settings.active_tab = d;
        const tab = d3.select(this);
        const active = tab.classed('pvl-tab--active');

        if (!active) {
            context.containers.tabs.classed('pvl-tab--active', false);
            tab.classed('pvl-tab--active', true);
            context.containers.charts.classed('pvl-hidden', true);
            context.containers.listing.classed('pvl-hidden', true);
            context.containers[d.toLowerCase()].classed('pvl-hidden', false);

            if (d === 'Charts') {
                context.ordinalChart.draw();
                context.linearChart.draw();
            } else context.listing.draw();
        }
    });
}
