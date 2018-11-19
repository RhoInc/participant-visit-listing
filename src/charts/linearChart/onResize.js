import removeLegend from '../functions/onResize/removeLegend';
import drawTopXAxis from '../functions/onResize/drawTopXAxis';
import positionButtons from '../functions/onResize/positionButtons';

export default function onResize() {
    removeLegend.call(this);
    drawTopXAxis.call(this);
    positionButtons.call(this);
}
