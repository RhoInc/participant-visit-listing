import updateRange from './addCell/updateRange';

export default function addCell(wb, ws, value, type, styles, range, row, col) {
    updateRange(range, row, col);
    styles.fill.fgColor.rgb = row > 0 && row % 2 ? 'FFffffff' : styles.fill.fgColor.rgb;
    const cell = { v: value, t: type, s: styles };
    const cell_ref = XLSX.utils.encode_cell({ c: col, r: row });
    ws[cell_ref] = cell;
}
