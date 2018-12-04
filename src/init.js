import checkRequiredVariables from './init/checkRequiredVariables';
import addVariables from './init/addVariables';
import defineSets from './init/defineSets';
import defineColumns from './init/defineColumns';
import transposeData from './init/transposeData';
import addLegend from './init/addLegend';
import updateMultiSelects from './init/updateMultiSelects';
import update from './init/update';

export default function init(data) {
    const t0 = performance.now();
    //begin performance test

        this.data = {
            raw: data,
            analysis: data,
            filtered: data,
            transposed: null,
            variables: Object.keys(data[0]),
            missingVariables: [],
            filters: [],
            sets: {}
        };
        checkRequiredVariables.call(this);
        addVariables.call(this);
        defineSets.call(this);
        defineColumns.call(this);
        transposeData.call(this);
        addLegend.call(this);
        if (this.settings.active_tab === 'Listing') {
            this.listing.init(this.data.transposed);
        } else if (this.settings.active_tab === 'Charts') {
            this.ordinalChart.init(this.data.raw);
            this.linearChart.init(this.data.raw);
        }
        updateMultiSelects.call(this);
        update.call(this);

    //end performance test
    const t1 = performance.now();
    console.log(`participantVisitListing.init() took ${t1 - t0} milliseconds.`);
}
