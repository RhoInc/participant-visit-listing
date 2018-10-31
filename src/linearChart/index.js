import onInit from './onInit';
import onLayout from './onLayout';
import onPreprocess from './onPreprocess';
import onDatatransform from './onDatatransform';
import onDraw from './onDraw';
import onResize from './onResize';
import onDestroy from './onDestroy';

export default function linearChart() {
    //Define listing.
    this.linearChart = new webCharts.createChart(
        this.containers.linearChart.node(),
        this.settings.linearChartSynced,
        this.controls
    );
    this.linearChart.pvl = this;

    //Define callbacks.
    this.linearChart.on('init', onInit);
    this.linearChart.on('layout', onLayout);
    this.linearChart.on('preprocess', onPreprocess);
    this.linearChart.on('datatransform', onDatatransform);
    this.linearChart.on('draw', onDraw);
    this.linearChart.on('resize', onResize);
    this.linearChart.on('destroy', onDestroy);
}
