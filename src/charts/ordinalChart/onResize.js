import removeLegend from '../functions/onResize/removeLegend';
import drawTopXAxis from '../functions/onResize/drawTopXAxis';
import positionButtons from '../functions/onResize/positionButtons';
import rotateXAxisTickLabels from './onResize/rotateXAxisTickLabels';
import addTooltipsToXAxisTicks from './onResize/addTooltipsToXAxisTicks';
import getItHeated from './onResize/getItHeated';
import highlightTickLabels from '../functions/onResize/highlightTickLabels';
import abbreviateXAxisTickLabels from './onResize/abbreviateXAxisTickLabels';

export default function onResize() {
    removeLegend.call(this);
    drawTopXAxis.call(this);
    positionButtons.call(this);
    rotateXAxisTickLabels.call(this);
    addTooltipsToXAxisTicks.call(this);
    getItHeated.call(this);
    highlightTickLabels.call(this);
    abbreviateXAxisTickLabels.call(this);

    if (this.pvl.settings.active_tab === 'Study Day Chart')
        this.pvl.containers.loading.classed('pvl-hidden', true);
}
