import updateLegend from './init/addLegend/update';

export default function controls() {
    const context = this;

    //Define controls.
    this.controls = new webCharts.createControls(
        this.containers.controls.node(),
        this.settings.controlsSynced
    );

    //Update legend when controls change.
    this.controls.wrap.on('change', function() {
        context.data.filtered = context.data.raw;
        context.listing.filters.forEach(filter => {
            context.data.filtered = context.data.filtered.filter(
                d =>
                    Array.isArray(filter.val)
                        ? filter.val.indexOf(d[filter.col]) > -1
                        : filter.val === 'All' || d[filter.col] === filter.val
            );
        });
        updateLegend.call(context);
    });
}
