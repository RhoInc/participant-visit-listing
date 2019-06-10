import headerStyle from './defineXLSX/headerStyle';
import bodyStyle from './defineXLSX/bodyStyle';
import workBook from './defineXLSX/workBook';
import addCell from './defineXLSX/addCell';
import clone from '../../../util/clone';

export default function defineXLSX() {
    const name = 'Participant Visit Listing';
    const wb = new workBook();
    const ws = {};
    const cols = [];
    const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    const wbOptions = {
        bookType: 'xlsx',
        bookSST: true,
        type: 'binary'
    };

    const filterRange =
        'A1:' + String.fromCharCode(64 + this.config.cols.length) + (this.data.filtered.length + 1);

    //Header row
    this.config.headers.forEach((header, col) => {
        addCell(wb, ws, header, 'c', clone(headerStyle), range, 0, col);
    });

    //Data rows
    this.data.filtered.forEach((d, row) => {
        this.config.cols.forEach((variable, col) => {
            const cellStyle = clone(bodyStyle);
            const color = d[`${variable}-color`];
            const fontColor = /^#[a-z0-9]{6}$/i.test(color) ? color.replace('#', 'FF') : 'FF000000';
            const borderColor = /^#[a-z0-9]{6}$/i.test(color)
                ? color.replace('#', 'FF')
                : 'FFCCCCCC';
            if (col > 2) {
                cellStyle.font.color.rgb = fontColor;
                cellStyle.border.bottom.color.rgb = borderColor;
            } else {
                delete cellStyle.font.color.rgb;
                delete cellStyle.border.bottom;
            }
            addCell(wb, ws, d[variable] || '', 'c', cellStyle, range, row + 1, col);
        });
    });

    //Define column widths.
    const tr = this.tbody.selectAll('tr').filter((d, i) => i === 0);
    tr.selectAll('td').each(function(d, i) {
        cols.push({ wpx: i > 0 ? this.offsetWidth - 20 : 175 });
    });

    ws['!ref'] = XLSX.utils.encode_range(range);
    ws['!cols'] = cols;
    ws['!autofilter'] = { ref: filterRange };
    //ws['!freeze'] = { xSplit: '1', ySplit: '1', topLeftCell: 'B2', activePane: 'bottomRight', state: 'frozen' };

    wb.SheetNames.push(name);
    wb.Sheets[name] = ws;

    this.XLSX = XLSX.write(wb, wbOptions);
}
