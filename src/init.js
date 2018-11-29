import checkRequiredVariables from './init/checkRequiredVariables';
import addVariables from './init/addVariables';
import defineSets from './init/defineSets';
import defineColumns from './init/defineColumns';
import transposeData from './init/transposeData';
import addLegend from './init/addLegend';
import updateMultiSelects from './init/updateMultiSelects';
import update from './init/update';

export default function init(data) {
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
    this.ordinalChart.init(this.data.raw);
    this.linearChart.init(this.data.raw);
    this.listing.init(this.data.transposed);
    updateMultiSelects.call(this);
    update.call(this);
}
