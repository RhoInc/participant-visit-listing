import updateLegend from './init/addLegend/update';

export default function controls() {
    const context = this;

    //Define controls.
    this.controls = new webCharts.createControls(
        this.containers.controls.node(),
        this.settings.controlsSynced
    );

    //Update legend when controls change.
    this.controls.wrap.on('change', function(d) {
        context.data.filtered = context.data.raw;
        context.listing.filters.forEach(filter => {
            context.data.filtered = context.data.filtered.filter(
                d => filter.val === 'All' || d[filter.col] === filter.val
            );
        });
        updateLegend.call(context);
    });
}
