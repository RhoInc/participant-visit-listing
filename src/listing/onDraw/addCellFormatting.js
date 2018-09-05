export default function addCellFormatting() {
    const context = this;

    this.tbody.selectAll('tr').each(function(d, i) {
        const row = d3.select(this);

        row.selectAll('td:not(:first-child)').each(function(di, j) {
            const cell = d3.select(this);

            //Add tooltip to cells.
            if (d[di.col] !== null)
                cell.attr(
                    'title',
                    `${d[context.parent.settings.rendererSynced.id_col]} - ${di.col}: ${
                        d[`${di.col}-status`]
                    }`
                );

            di.color = (d[`${di.col}-color`] || 'white').toLowerCase();

            //Apply cell border coloring.
            if (!/white/.test(di.color))
                cell.style(
                    'border-bottom',
                    `2px solid ${di.color === 'black' ? '#ccc' : di.color}`
                );

            //Apply cell text coloring.
            if (!/black|white/.test(di.color)) cell.style('color', di.color);
        });
    });
}
