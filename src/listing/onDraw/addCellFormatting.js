export default function addCellFormatting() {
    const context = this;

    this.tbody.selectAll('tr').each(function(d, i) {
        const row = d3.select(this);

        row.selectAll('td:nth-child(n+4)').each(function(di, j) {
            const cell = d3.select(this).classed('pvl-emboldened', /\d\d/.test(di.text));
            di.date = d[`${di.col}-date`];

            //Add tooltip to cells.
            if (d[di.col] !== null)
                cell.attr(
                    'title',
                    `${d[context.pvl.settings.id_col]} - ${di.col} (${di.date}): ${
                        d[`${di.col}-status`]
                    }`
                );

            //Apply cell formmating.
            di.color = (d[`${di.col}-color`] || 'white').toLowerCase();
            cell.style({
                'border-top': `2px solid ${di.color === 'black' ? '#ccc' : di.color}`,
                'border-bottom': `2px solid ${di.color === 'black' ? '#ccc' : di.color}`
            }); // border-bottom
            if (context.config.display_cell_text) {
                if (!/black|white/.test(di.color))
                    cell.style({
                        background: i % 2 ? '#eee' : 'white',
                        color: di.color
                    }); // color
            } else {
                if (!/black|white/.test(di.color))
                    cell.style({
                        background: di.color,
                        opacity: 0.9
                    }); // color
                cell.style('color', 'transparent');
            }
        });
    });
}
