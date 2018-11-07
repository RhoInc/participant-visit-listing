export default function exportToPDF() {
    this.wrap.select('.export#pdf').on('click', () => {
        const doc = new jsPDF('l', 'pt');
        const tableNode = this.table.node();
        const json = doc.autoTableHtmlToJson(tableNode);
        doc.autoTable(json.columns, json.data);
        doc.save(
            `participant-visit-listing-${d3.time.format('%Y-%m-%dT%H-%M-%S')(new Date())}.pdf`
        );
    });
}
