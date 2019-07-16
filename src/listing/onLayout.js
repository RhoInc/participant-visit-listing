import hideListing from './onLayout/hideListing';
import addTopScrollBar from './onLayout/addTopScrollBar';
import disableDefaultSorting from './onLayout/disableDefaultSorting';
import toggleCellText from './onLayout/toggleCellText';
import toggleVisitDates from './onLayout/toggleVisitDates';
import addPDFExport from './onLayout/addPDFExport';

export default function onLayout() {
    hideListing.call(this);
    addTopScrollBar.call(this);
    disableDefaultSorting.call(this);
    toggleCellText.call(this);
    toggleVisitDates.call(this);
    addPDFExport.call(this);
}
