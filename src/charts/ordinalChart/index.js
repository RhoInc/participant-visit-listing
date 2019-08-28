import { createChart } from 'webcharts';
import onInit from './onInit';
import onLayout from './onLayout';
import onPreprocess from './onPreprocess';
import onDatatransform from './onDatatransform';
import onDraw from './onDraw';
import onResize from './onResize';
import onDestroy from './onDestroy';

export default function ordinalChart() {
    // Define ordinal chart (Visit Chart).
    this.ordinalChart = new createChart(
        this.containers.ordinalChart.node(),
        this.settings.ordinalChartSynced,
        this.controls
    );
    this.ordinalChart.pvl = this;

    // Define callbacks.
    this.ordinalChart.on('init', onInit);
    this.ordinalChart.on('layout', onLayout);
    this.ordinalChart.on('preprocess', onPreprocess);
    this.ordinalChart.on('datatransform', onDatatransform);
    this.ordinalChart.on('draw', onDraw);
    this.ordinalChart.on('resize', onResize);
    this.ordinalChart.on('destroy', onDestroy);

    // Attach display to central object ([ pvl ]).
    this.displays.push({
        name: 'ordinalChart',
        title: 'Visit Chart',
        module: this.ordinalChart,
        tabs: ['Visit Chart', 'Charts'],
        active: ['Visit Chart', 'Charts'].includes(this.settings.active_tab)
    });
}
