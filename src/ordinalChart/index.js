import onInit from './onInit';
import onLayout from './onLayout';
import onPreprocess from './onPreprocess';
import onDatatransform from './onDatatransform';
import onDraw from './onDraw';
import onResize from './onResize';
import onDestroy from './onDestroy';

export default function ordinalChart() {
    //Define listing.
    this.ordinalChart = new webCharts.createChart(
        this.containers.ordinalChart.node(),
        this.settings.ordinalChartSynced,
        this.controls
    );
    this.ordinalChart.pvl = this;

    //Define callbacks.
    this.ordinalChart.on('init', onInit);
    this.ordinalChart.on('layout', onLayout);
    this.ordinalChart.on('preprocess', onPreprocess);
    this.ordinalChart.on('datatransform', onDatatransform);
    this.ordinalChart.on('draw', onDraw);
    this.ordinalChart.on('resize', onResize);
    this.ordinalChart.on('destroy', onDestroy);
}
