import hideListing from './onLayout/hideListing';
import disableDefaultSorting from './onLayout/disableDefaultSorting';
import toggleCellText from './onLayout/toggleCellText';
import addPDFExport from './onLayout/addPDFExport';

export default function onLayout() {
    hideListing.call(this);
    disableDefaultSorting.call(this);
    toggleCellText.call(this);
    addPDFExport.call(this);
}
