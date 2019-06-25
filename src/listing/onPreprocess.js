import defineColumns from './onInit/defineColumns';
import sortData from './onDraw/sortChronologically/sortData';

export default function onPreprocess() {
    defineColumns.call(this);
    sortData.call(this, this.data.raw);
}
