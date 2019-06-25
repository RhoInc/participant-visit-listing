import loading from './util/loading';
import checkRequiredVariables from './init/checkRequiredVariables';
import addVariables from './init/addVariables';
import defineSets from './init/defineSets';
import calculateVisitStatistics from './init/calculateVisitStatistics';
import addVisitStatusStyles from './init/addVisitStatusStyles';
import transposeData from './init/transposeData';
import addLegends from './init/addLegends';
import updateNParticipants from './init/updateNParticipants';
import updateMultiSelects from './init/updateMultiSelects';
import update from './init/update';

export default function init(data) {
    //Data manipulation
    loading.call(this, 'Data manipulation', () => {
        this.data = {
            raw: data,
            analysis: data,
            filtered: data,
            transposed: [],
            variables: [],
            missingVariables: [],
            filters: [],
            sets: {},
            statistics: {}
        };

        addVariables.call(this);
        checkRequiredVariables.call(this);
        defineSets.call(this);
        calculateVisitStatistics.call(this);
        addVisitStatusStyles.call(this);
        transposeData.call(this);
        addLegends.call(this);
        updateNParticipants.call(this);

        //Display initialization
        loading.call(this, 'Display initialization', () => {
            if (this.settings.active_tab === 'Listing') {
                this.listing.init(this.data.transposed, this.test);
                this.containers.visitExpectationLegendContainer.classed('pvl-hidden', true);
                this.containers.ordinalChart.classed('pvl-hidden', true);
                this.containers.linearChart.classed('pvl-hidden', true);
                this.containers.listing.classed('pvl-hidden', true);
            } else if (this.settings.active_tab === 'Charts') {
                this.ordinalChart.init(this.data.raw, this.test);
                this.linearChart.init(this.data.raw, this.test);
                this.containers.visitExpectationLegendContainer.classed('pvl-hidden', false);
                this.containers.listing.classed('pvl-hidden', true);
            } else if (this.settings.active_tab === 'Visit Chart') {
                this.ordinalChart.init(this.data.raw, this.test);
                this.containers.visitExpectationLegendContainer.classed('pvl-hidden', false);
                this.containers.linearChart.classed('pvl-hidden', true);
                this.containers.listing.classed('pvl-hidden', true);
            } else if (this.settings.active_tab === 'Study Day Chart') {
                this.linearChart.init(this.data.raw, this.test);
                this.containers.visitExpectationLegendContainer.classed('pvl-hidden', false);
                this.containers.visitExpectationLegend.past.rect.classed('pvl-hidden', true);
                this.containers.visitExpectationLegend.future.rect.classed('pvl-hidden', true);
                this.containers.ordinalChart.classed('pvl-hidden', true);
                this.containers.listing.classed('pvl-hidden', true);
            }
            updateMultiSelects.call(this);
            update.call(this);
            if (this.test) this.loaded = true;
        });
    });
}
