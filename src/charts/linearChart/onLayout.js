import addTopXAxis from '../functions/onLayout/addTopXAxis';
import addButtons from '../functions/onLayout/addButtons';

export default function onLayout() {
    addTopXAxis.call(this);
    addButtons.call(this);
    this.bottomXAxis = {
        container: this.svg.select('.x.axis').classed('x--bottom', true)
    };
    if (this.pvl.settings.active_tab !== 'Charts')
        this.pvl.containers.charts.classed('pvl-hidden', true);
}
