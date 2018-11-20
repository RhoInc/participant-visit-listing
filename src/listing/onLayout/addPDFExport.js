export default function addPDFExport() {
    if (window.jsPDF)
        this.exportable.wrap
            .insert('a', '#csv')
            .classed('wc-button export', true)
            .attr('id', 'pdf')
            .text('PDF');
}
