import filterData from './update/filterData';
import defineIDSet from './defineSets/defineDefaultSet';
import defineVisitSet from './defineSets/defineVisitSet';
import defineColumns from './defineColumns';
import transposeData from './transposeData';
import updateLegend from './addLegend/update';

export default function update() {
    const context = this;

    //Capture all data filter dropdowns.
    const filters = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type === 'subsetter')
        .selectAll('select');

    //Remove extra 'All' options; not sure where they're coming from.
    filters
        .selectAll('option')
        .filter(d => d === 'All')
        .filter((d, i) => i > 0)
        .remove();

    //Redefine the event listener.
    filters.on('change', function(d) {
        //Indicate loading.
        context.containers[`loading${context.settings.active_tab}`].classed('pvl-hidden', false);

        const loading = setInterval(() => {
            const loadingIndicated =
                context.containers[`loading${context.settings.active_tab}`].style('display') !==
                'none';

            if (loadingIndicated) {
                //Handle loading indicator.
                clearInterval(loading);
                context.containers[`loading${context.settings.active_tab}`].classed(
                    'pvl-hidden',
                    true
                );

                //Run code.
                filterData.call(context, d, this);
                defineIDSet.call(context, 'id_col');

                //Update visit set and listing columns if the changed filter controls an analysis subset.
                if (/^Analysis Subset \d$/.test(d.label)) {
                    defineVisitSet.call(context);
                    defineColumns.call(context);
                }

                transposeData.call(context);
                updateLegend.call(context);

                if (context.listing.initialized) context.listing.data.raw = context.data.transposed;
                if (context.ordinalChart.initialized)
                    context.ordinalChart.raw_data = context.data.filtered;
                if (context.linearChart.initialized)
                    context.linearChart.raw_data = context.data.filtered;

                //Redraw displays.
                if (context.settings.active_tab === 'Listing') {
                    context.listing.draw();
                } else if (context.settings.active_tab === 'Charts') {
                    context.ordinalChart.draw();
                    context.linearChart.draw();
                }
            }
        });
    });
}
