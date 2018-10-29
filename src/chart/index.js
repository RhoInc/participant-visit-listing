import onInit from './onInit';
import onLayout from './onLayout';
import onPreprocess from './onPreprocess';
import onDatatransform from './onDatatransform';
import onDraw from './onDraw';
import onResize from './onResize';
import onDestroy from './onDestroy';

export default function chart() {
    //Define listing.
    this.chart = new webCharts.createChart(
        this.containers.chart.node(),
        this.settings,
        this.controls
    );
    this.chart.parent = this;

    //Define callbacks.
    this.chart.on('init', onInit);
    this.chart.on('layout', onLayout);
    this.chart.on('preprocess', onPreprocess);
    this.chart.on('datatransform', onDatatransform);
    this.chart.on('draw', onDraw);
    this.chart.on('resize', onResize);
    this.chart.on('destroy', onDestroy);
}
