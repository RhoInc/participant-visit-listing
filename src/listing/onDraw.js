import addHeaderHover from './onDraw/addHeaderHover';
import floatHeader from './onDraw/floatHeader';
import addCellFormatting from './onDraw/addCellFormatting';
import sortChronologically from './onDraw/sortChronologically';

export default function onDraw() {
    //Highlight column when hovering over column header.
    addHeaderHover.call(this);

    //Sort columns on click chronologically.
    sortChronologically.call(this);

    //Float table header as user scrolls.
    floatHeader.call(this);

    //Add data-driven cell formatting.
    addCellFormatting.call(this);
}
