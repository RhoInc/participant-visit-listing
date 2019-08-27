import { createChart } from 'webcharts';
import onInit from './onInit';
import onLayout from './onLayout';
import onPreprocess from './onPreprocess';
import onDatatransform from './onDatatransform';
import onDraw from './onDraw';
import onResize from './onResize';
import onDestroy from './onDestroy';

export default function linearChart() {
    // Define linear chart (Study Day chart).
    this.linearChart = new createChart(
        this.containers.linearChart.node(),
        this.settings.linearChartSynced,
        this.controls
    );
    this.linearChart.pvl = this;

    // Define callbacks.
    this.linearChart.on('init', onInit);
    this.linearChart.on('layout', onLayout);
    this.linearChart.on('preprocess', onPreprocess);
    this.linearChart.on('datatransform', onDatatransform);
    this.linearChart.on('draw', onDraw);
    this.linearChart.on('resize', onResize);
    this.linearChart.on('destroy', onDestroy);

    // Attach display to central object ([ pvl ]).
    this.displays.push(
        {
            name: 'linearChart',
            title: 'Study Day Chart',
            module: this.linearChart,
            tabs: ['Study Day Chart', 'Charts'],
            active: ['Study Day Chart', 'Charts'].includes(this.settings.active_tab),
        }
    );
}
