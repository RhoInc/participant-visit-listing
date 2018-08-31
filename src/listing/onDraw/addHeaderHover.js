export default function addHeaderHover() {
    //Highlight column when hovering over column header.
    this.thead
        .selectAll('th')
        .on('mouseover', function(d,i) {
            const th = d3.select(this)
                .style('outline', '1px solid black');
            d3.selectAll(`tr td:nth-child(${i+1})`)
                .style('border-left', '1px solid black')
                .style('border-right', '1px solid black');
        })
        .on('mouseout', function(d,i) {
            const th = d3.select(this)
                .style('outline', 'none');
            d3.selectAll(`tr td:nth-child(${i+1})`)
                .style('border-left', 'none')
                .style('border-right', 'none');
        });
}
