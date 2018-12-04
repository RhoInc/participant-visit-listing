import updateMultiSelects from '../init/updateMultiSelects';

export default function addTabFunctionality() {
    const context = this;

    this.containers.tabs.on('click', function(d) {
        const t0 = performance.now();
        //begin performance test

        context.settings.active_tab = d;
        const tab = d3.select(this);
        const active = tab.classed('pvl-tab--active');

        if (!active) {
            context.containers.tabs.classed('pvl-tab--active', false);
            tab.classed('pvl-tab--active', true);
            context.containers.charts.classed('pvl-hidden', true);
            context.containers.listing.classed('pvl-hidden', true);
            context.containers[d.toLowerCase()].classed('pvl-hidden', false);

            if (d === 'Listing') {
                //Initialize or draw listing.
                if (context.listing.intialized)
                    context.listing.draw(context.data.transposed);
                else
                    context.listing.init(context.data.transposed);
            } else if (d === 'Charts') {
                //Initialize or draw ordinal chart.
                if (context.ordinalChart.intialized)
                    context.ordinalChart.draw(context.data.filtered);
                else
                    context.ordinalChart.init(context.data.filtered);

                //Initialize or draw linear chart.
                if (context.linearChart.intialized)
                    context.linearChart.draw(context.data.filtered);
                else
                    context.linearChart.init(context.data.filtered);
            }
            updateMultiSelects.call(context, true);
        }

        //end performance test
        const t1 = performance.now();
        console.log(`addTabFunctionality.click() took ${t1 - t0} milliseconds.`);
    });
}
