export default function onLayout() {
    this.config.sortable = false;
    if (this.pvl.settings.active_tab === 'Charts')
        this.pvl.containers.listing.classed('pvl-hidden', true);
    if (window.jsPDF)
        this.exportable.wrap
            .insert('a', '#csv')
            .classed('wc-button export', true)
            .attr('id', 'pdf')
            .text('PDF');
}
