import checkRequiredVariables from './init/checkRequiredVariables';
import addVariables from './init/addVariables';
import defineSets from './init/defineSets';
import addVisitStatusStyles from './init/addVisitStatusStyles';
import defineColumns from './init/defineColumns';
import transposeData from './init/transposeData';
import addLegend from './init/addLegend';
import updateNParticipants from './init/updateNParticipants';
import updateMultiSelects from './init/updateMultiSelects';
import update from './init/update';

export default function init(data) {
    //indicate loading
    this.containers.loading.classed('pvl-hidden', false);

    const loading = setInterval(() => {
        const loadingIndicated = this.containers.loading.style('display') !== 'none';

        if (loadingIndicated) {
            //Handle loading indicator.
            clearInterval(loading);
            this.containers.loading.classed('pvl-hidden', true);

            /****---------------------------------------------------------------------------------\
              Data manipulation
            \---------------------------------------------------------------------------------****/

            let t0 = this.performance.now();
            //begin performance test

            //Attach data.
            this.data = {
                raw: data,
                analysis: data,
                filtered: data,
                transposed: [],
                variables: [],
                missingVariables: [],
                filters: [],
                sets: {}
            };

            addVariables.call(this);
            checkRequiredVariables.call(this);
            defineSets.call(this);
            addVisitStatusStyles.call(this);
            defineColumns.call(this);
            transposeData.call(this);
            addLegend.call(this);
            updateNParticipants.call(this);

            //end performance test
            let t1 = this.performance.now();
            console.log(`data manipulation took ${t1 - t0} milliseconds.`);

            /****---------------------------------------------------------------------------------\
              Display initialization
            \---------------------------------------------------------------------------------****/

            t0 = this.performance.now();
            //begin performance test

            if (this.settings.active_tab === 'Listing') {
                this.listing.init(this.data.transposed, this.test);
            } else if (this.settings.active_tab === 'Charts') {
                this.ordinalChart.init(this.data.raw, this.test);
                this.linearChart.init(this.data.raw, this.test);
            } else if (this.settings.active_tab === 'Visit Chart') {
                this.ordinalChart.init(this.data.raw, this.test);
            } else if (this.settings.active_tab === 'Study Day Chart') {
                this.linearChart.init(this.data.raw, this.test);
            }
            updateMultiSelects.call(this);
            update.call(this);

            //end performance test
            t1 = this.performance.now();
            console.log(`display initialization took ${t1 - t0} milliseconds.`);
        }
    });
}
