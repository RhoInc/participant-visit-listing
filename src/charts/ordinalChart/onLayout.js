import addTopXAxis from '../functions/onLayout/addTopXAxis';
import addVisitExpectationLegend from '../functions/onLayout/addVisitExpectationLegend';
import addButtons from '../functions/onLayout/addButtons';
import scrollTopXAxis from '../functions/onLayout/scrollTopXAxis';
import attachBottomXAxis from '../functions/onLayout/attachBottomXAxis';
import hideCharts from '../functions/onLayout/hideCharts';

export default function onLayout() {
    addTopXAxis.call(this);
    addVisitExpectationLegend.call(this);
    addButtons.call(this);
    scrollTopXAxis.call(this);
    attachBottomXAxis.call(this);
    hideCharts.call(this);
}
