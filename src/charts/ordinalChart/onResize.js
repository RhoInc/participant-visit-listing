import removeLegend from '../functions/onResize/removeLegend';
import drawTopXAxis from '../functions/onResize/drawTopXAxis';
import positionButtons from '../functions/onResize/positionButtons';
import rotateXAxisTickLabels from './onResize/rotateXAxisTickLabels';
import getItHeated from './onResize/getItHeated';

export default function onResize() {
    removeLegend.call(this);
    drawTopXAxis.call(this);
    positionButtons.call(this);
    rotateXAxisTickLabels.call(this);
    getItHeated.call(this);
}
