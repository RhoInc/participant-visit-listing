import checkRequiredVariables from './init/checkRequiredVariables';
import addVariables from './init/addVariables';
import defineSets from './init/defineSets';
import addVisitStatusStyles from './init/addVisitStatusStyles';
import defineColumns from './init/defineColumns';
import transposeData from './init/transposeData';
import addLegend from './init/addLegend';
import updateMultiSelects from './init/updateMultiSelects';
import update from './init/update';

export default function init(data) {
    //indicate loading
    this.containers[`loading${this.settings.active_tab}`].classed('pvl-hidden', false);

    const loading = setInterval(() => {
        const loadingIndicated =
            this.containers[`loading${this.settings.active_tab}`].style('display') !== 'none';

        if (loadingIndicated) {
            //Handle loading indicator.
            clearInterval(loading);
            this.containers[`loading${this.settings.active_tab}`].classed('pvl-hidden', true);

            //Run code.
            let t0 = performance.now();
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
            addVisitStatusStyles.call(this);
            defineColumns.call(this);
            transposeData.call(this);
            addLegend.call(this);

            //end performance test
            let t1 = performance.now();
            console.log(`data manipulation took ${t1 - t0} milliseconds.`);

            t0 = performance.now();
            //begin performance test

            if (this.settings.active_tab === 'Listing') {
                this.containers.loadingCharts.classed('pvl-hidden', true);
                this.listing.init(this.data.transposed);
            } else if (this.settings.active_tab === 'Charts') {
                this.containers.loadingListing.classed('pvl-hidden', true);
                this.ordinalChart.init(this.data.raw);
                this.linearChart.init(this.data.raw);
            }
            updateMultiSelects.call(this);
            update.call(this);

            //end performance test
            t1 = performance.now();
            console.log(`display initialization took ${t1 - t0} milliseconds.`);
        }
    });
}
