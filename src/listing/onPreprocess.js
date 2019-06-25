import defineColumns from './onInit/defineColumns';
import clearSort from './onPreprocess/clearSort';
import sortData from './onDraw/sortChronologically/sortData';

export default function onPreprocess() {
    defineColumns.call(this);
    clearSort.call(this);
    sortData.call(this, this.data.raw);
}
