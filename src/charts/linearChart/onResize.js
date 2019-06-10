import removeLegend from '../functions/onResize/removeLegend';
import drawTopXAxis from '../functions/onResize/drawTopXAxis';
import positionButtons from '../functions/onResize/positionButtons';
import addAnnotationLegend from './onResize/addAnnotationLegend';
import updateTextMarks from './onResize/updateTextMarks';

export default function onResize() {
    removeLegend.call(this);
    drawTopXAxis.call(this);
    positionButtons.call(this);
    addAnnotationLegend.call(this);
    updateTextMarks.call(this);

    if (['Charts', 'Study Day Chart'].indexOf(this.pvl.settings.active_tab) > -1)
        this.pvl.containers.loading.classed('pvl-hidden', true);
}
