import removeLegend from './onResize/removeLegend';
import drawTopXAxis from './onResize/drawTopXAxis';
import positionButtons from './onResize/positionButtons';

export default function onResize() {
    removeLegend.call(this);
    drawTopXAxis.call(this);
    positionButtons.call(this);
}
