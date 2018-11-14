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
            if (!/white/.test(di.color))
                cell.style({
                    'border-bottom': `2px solid ${di.color === 'black' ? '#ccc' : di.color}`,
                }); // border-bottom
            if (!/black|white/.test(di.color))
                cell.style({
                    background: di.color,
                    opacity: .9,
                }); // color
            if (!context.config.display_cell_text)
                cell.style('color', 'transparent');

            //Italicize expected visits.
            //if (context.config.visit_expectation_regex.test(d[`${di.col}-status`]))
            //    cell.style('font-style', 'italic');
        });
    });
}
