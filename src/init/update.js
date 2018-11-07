import filterData from './update/filterData';
import defineIDSet from './defineSets/defineDefaultSet';
import defineVisitSet from './defineSets/defineVisitSet';
import defineColumns from './defineColumns';
import transposeData from './transposeData';
import updateLegend from './addLegend/update';

export default function update() {
    const context = this;

    const analysisSubsetters = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => /^Analysis Subset \d$/.test(d.label))
        .selectAll('select');
    analysisSubsetters
        .selectAll('option')
        .filter(d => d === 'All')
        .filter((d, i) => i > 0)
        .remove();
    analysisSubsetters.on('change', function(d) {
        filterData.call(context, d, this);
        defineIDSet.call(context, 'id_col');
        defineVisitSet.call(context);
        defineColumns.call(context);
        transposeData.call(context);
        updateLegend.call(context);
        context.listing.data.raw = context.data.transposed;

        //Redraw displays.
        if (context.settings.active_tab === 'Charts') {
            context.ordinalChart.draw();
            context.linearChart.raw_data = context.data.filtered;
            context.linearChart.draw();
        } else context.listing.draw();
    });
}
