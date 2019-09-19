export default function hideCharts() {
    // Hide Charts container if the Listing tab is active.
    if (
        this.pvl.settings.chart_layout === 'side-by-side' &&
        this.pvl.settings.active_tab !== 'Charts' &&
        this.property === 'linearChart'
    )
        this.pvl.containers.charts.classed('pvl-hidden', true);

    // Hide the other chart container if its tab is not active.
    if (this.pvl.settings.chart_layout === 'tabbed') {
        const otherProperty = this.property === 'ordinalChart' ? 'linearChart' : 'ordinalChart';
        this.pvl.containers[otherProperty].classed('pvl-hidden', true);
    }

    // Hide listing.
    if (this.pvl.settings.active_tab !== 'Listing')
        this.pvl.containers.listing.classed('pvl-hidden', true);
}
