import defineSets from './init/defineSets';
import defineColumns from './init/defineColumns';
import transposeData from './init/transposeData';

export default function init(data) {
    this.data = {
        raw: data,
        sets: {},
        transposed: []
    };
    defineSets.call(this);
    defineColumns.call(this);
    transposeData.call(this);
    this.listing.init(this.data.transposed);
}
