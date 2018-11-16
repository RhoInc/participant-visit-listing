import addTopXAxis from './onLayout/addTopXAxis';
import addButtons from './onLayout/addButtons';

export default function onLayout() {
    addTopXAxis.call(this);
    addButtons.call(this);
    this.bottomXAxis = {
        container: this.svg.select('.x.axis').classed('x--bottom', true)
    };
    if (this.pvl.settings.active_tab !== 'Charts')
        this.pvl.containers.charts.classed('pvl-hidden', true);
}
