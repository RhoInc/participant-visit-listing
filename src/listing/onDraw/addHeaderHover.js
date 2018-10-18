export default function addHeaderHover() {
    //Highlight column when hovering over column header.
    this.thead
        .selectAll('th')
        .on('mouseover', function(d, i) {
            d3.select(this).classed('pvl-header-hover', true);
            d3.selectAll(`tr td:nth-child(${i + 1})`).classed('pvl-header-hover', true);
        })
        .on('mouseout', function(d, i) {
            d3.select(this).classed('pvl-header-hover', false);
            d3.selectAll(`tr td:nth-child(${i + 1})`).classed('pvl-header-hover', false);
        });
}
