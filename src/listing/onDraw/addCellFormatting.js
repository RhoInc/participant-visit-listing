import { select } from 'd3';

export default function addCellFormatting() {
    const context = this;

    //Formatting cells via .css.
    this.tbody.selectAll('tr').each(function(d) {
        const visitCells = select(this)
            .selectAll('td:nth-child(n + 4)')
            .attr('class', di =>
                d[`${di.col}-status`]
                    ? `pvl-visit-status--${d[`${di.col}-status`]
                          .toLowerCase()
                          .replace(/[^_a-z-]/g, '-')}`
                    : ``
            )
            .classed('pvl-visit-status', true)
            .classed('pvl-visit-status--heat-map', !context.config.display_cell_text)
            .classed('pvl-visit-status--cell-text', context.config.display_cell_text);
        visitCells.each(function(di) {
            const visitCell = select(this);
            di.date = d[`${di.col}-date`];
            if (d[di.col] !== null)
                visitCell.attr(
                    'title',
                    `${d[context.pvl.settings.id_col]} - ${di.col} (${di.date}): ${
                        d[`${di.col}-status`]
                    }`
                );
        });
    });
}
