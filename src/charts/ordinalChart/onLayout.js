import addTopXAxis from '../functions/onLayout/addTopXAxis';
import addButtons from '../functions/onLayout/addButtons';
import scrolling from '../functions/onLayout/scrolling';

export default function onLayout() {
    addTopXAxis.call(this);
    addButtons.call(this);
    this.bottomXAxis = {
        container: this.svg.select('.x.axis').classed('x--bottom', true)
    };
    if (
        this.pvl.settings.active_tab !== 'Visit Chart' &&
        this.pvl.settings.chart_layout === 'tabbed'
    )
        this.pvl.containers.ordinalChart.classed('pvl-hidden', true);
    scrolling.call(this);
}
