import syncScrollBars from './onDraw/syncScrollBars';
import addHeaderHover from './onDraw/addHeaderHover';
import addCellFormatting from './onDraw/addCellFormatting';
import addSummaries from './onDraw/addSummaries';
import sortChronologically from './onDraw/sortChronologically';
import exportToXLSX from './onDraw/exportToXLSX';
import exportToPDF from './onDraw/exportToPDF';
import exportToCSV from './onDraw/exportToCSV';

export default function onDraw() {
    // Sync top and bottom scroll bars.
    syncScrollBars.call(this);

    // Highlight column when hovering over column header.
    addHeaderHover.call(this);

    // Sort columns on click chronologically.
    sortChronologically.call(this);

    // Add row and column summaries.
    addSummaries.call(this);

    // Add data-driven cell formatting.
    addCellFormatting.call(this);

    // Add styled export to .xlsx.
    exportToXLSX.call(this);

    // Add styled (eventually) export to .pdf.
    exportToPDF.call(this);

    // Add export to .csv.
    exportToCSV.call(this);

    if (this.pvl.settings.active_tab === 'Listing')
        this.pvl.containers.loading.classed('pvl-hidden', true);
}
