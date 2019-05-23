import { nest, set, format, select } from 'd3';

export default function participant() {
    // create dictionary of id columns
    const idDict = nest()
        .key(d => d[this.pvl.settings.id_col])
        .rollup(d => d)
        .map(this.pvl.data.raw);

    // get all the cells
    const cells = this.table.selectAll('tbody tr').selectAll('td:nth-child(2)');

    // create ditionary of table cells
    const cellDict = cells.size()
        ? nest()
              .key(d => d[0].__data__.text)
              .rollup(d => d[0])
              .map(cells)
        : [];

    // get ids
    const id_cols = set(this.data.raw.map(d => d[this.pvl.settings.id_col])).values();

    id_cols.forEach(id => {
        const id_data = idDict[id];
        const id_cell = cellDict[id];
        if (id_data && id_cell) {
            const id_summary = nest()
                .key(d => d[this.pvl.settings.visit_status_col])
                .rollup(d => format('%')(d.length / id_data.length))
                .entries(id_data);
            select(id_cell[0]).attr(
                'title',
                id_summary.map(status => `${status.key} (${status.values})`).join('\n')
            );
        }
    });
}
