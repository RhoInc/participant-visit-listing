import defineSets from './init/defineSets';
import defineColumns from './init/defineColumns';
import transposeData from './init/transposeData';
import addLegend from './init/addLegend';

export default function init(data) {
    this.data = {
        raw: data,
        filtered: data,
        sets: {},
        transposed: []
    };
    defineSets.call(this);
    defineColumns.call(this);
    transposeData.call(this);
    addLegend.call(this);
    this.listing.init(this.data.transposed);
}
