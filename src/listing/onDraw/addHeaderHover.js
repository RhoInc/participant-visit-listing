import { select, selectAll } from 'd3';

export default function addHeaderHover() {
    // Highlight column when hovering over column header.
    this.thead
        .selectAll('th')
        .on('mouseover', function(d, i) {
            select(this).classed('pvl-header-hover', true);
            selectAll(`tr td:nth-child(${i + 1})`).classed('pvl-header-hover', true);
        })
        .on('mouseout', function(d, i) {
            select(this).classed('pvl-header-hover', false);
            selectAll(`tr td:nth-child(${i + 1})`).classed('pvl-header-hover', false);
        });
}
