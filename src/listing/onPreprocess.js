import sortData from './onDraw/sortChronologically/sortData';

export default function onPreprocess() {
    sortData.call(this, this.data.raw);
}
