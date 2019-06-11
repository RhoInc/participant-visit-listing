import removeLegend from '../functions/onResize/removeLegend';
import drawTopXAxis from '../functions/onResize/drawTopXAxis';
import positionButtons from '../functions/onResize/positionButtons';
import rotateXAxisTickLabels from './onResize/rotateXAxisTickLabels';
import getItHeated from './onResize/getItHeated';
import highlightTickLabels from '../functions/onResize/highlightTickLabels';

export default function onResize() {
    removeLegend.call(this);
    drawTopXAxis.call(this);
    positionButtons.call(this);
    rotateXAxisTickLabels.call(this);
    getItHeated.call(this);
    highlightTickLabels.call(this);

    if (this.pvl.settings.active_tab === 'Study Day Chart')
        this.pvl.containers.loading.classed('pvl-hidden', true);
}
