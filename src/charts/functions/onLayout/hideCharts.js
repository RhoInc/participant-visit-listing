export default function hideCharts() {
    if (
        this.property === 'linearChart' &&
        this.pvl.settings.active_tab !== 'Charts' &&
        this.pvl.settings.chart_layout === 'side-by-side'
    )
        this.pvl.containers.charts.classed('pvl-hidden', true);

    if (
        this.pvl.settings.chart_layout === 'tabbed' &&
        ((this.property === 'ordinalChart' && this.pvl.settings.active_tab !== 'Visit Chart') ||
            (this.property === 'linearChart' && this.pvl.settings.active_tab !== 'Study Day Chart'))
    )
        this.pvl.containers[this.property].classed('pvl-hidden', true);
}
