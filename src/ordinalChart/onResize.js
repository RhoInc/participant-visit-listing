import removeLegend from './onResize/removeLegend';
import addTopXAxis from './onResize/addTopXAxis';
import rotateXAxisTickLabels from './onResize/rotateXAxisTickLabels';
import getItHeated from './onResize/getItHeated';

export default function onResize() {
    removeLegend.call(this);
    addTopXAxis.call(this);
    rotateXAxisTickLabels.call(this);
    getItHeated.call(this);
}
