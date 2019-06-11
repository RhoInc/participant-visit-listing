import removeLegend from '../functions/onResize/removeLegend';
import drawTopXAxis from '../functions/onResize/drawTopXAxis';
import addAnnotationLegend from './onResize/addAnnotationLegend';
import positionButtons from '../functions/onResize/positionButtons';
import updateTextMarks from './onResize/updateTextMarks';
import highlightVisit from './onResize/highlightVisit';
import maintainHighlight from './onResize/maintainHighlight';

export default function onResize() {
    removeLegend.call(this);
    drawTopXAxis.call(this);
    addAnnotationLegend.call(this);
    positionButtons.call(this);
    updateTextMarks.call(this);
    highlightVisit.call(this);
    maintainHighlight.call(this);

    if (['Charts', 'Study Day Chart'].indexOf(this.pvl.settings.active_tab) > -1)
        this.pvl.containers.loading.classed('pvl-hidden', true);
}
