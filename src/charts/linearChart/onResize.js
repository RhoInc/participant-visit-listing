import removeLegend from '../functions/onResize/removeLegend';
import drawTopXAxis from '../functions/onResize/drawTopXAxis';
import positionButtons from '../functions/onResize/positionButtons';
import addAnnotationLegend from './onResize/addAnnotationLegend';
import classTextMarks from './onResize/classTextMarks';

export default function onResize() {
    removeLegend.call(this);
    drawTopXAxis.call(this);
    positionButtons.call(this);
    addAnnotationLegend.call(this);
    classTextMarks.call(this);
}
