export default function onDraw() {
    this.tbody
        .selectAll('tr')
        .each(function(d,i) {
            const row = d3.select(this);

            row.selectAll('td')
                .each(function(di,j) {
                    const cell = d3.select(this);
                    const color = d[`${di.col}-color`];

                    //Apply cell coloring.
                    if (!/black/i.test(color)) {
                        cell.style('color', color);
                        cell.style('border', `1px solid ${color}`);
                    }
                });
        });

    //Highlight column when hovering over column header.
    this.thead
        .selectAll('th')
        .on('mouseover', function(d,i) {
            const th = d3.select(this);
            d3.selectAll(`tr td:nth-child(${i})`)
                .style('outline', '2px solid black');
        })
        .on('mouseout', function(d,i) {
            const th = d3.select(this);
            d3.selectAll(`tr td:nth-child(${i})`)
                .style('outline', 'none');
        });

    //Float table header as user scrolls.
    this.wrap
        .on('scroll', function() {
            const thead = this.querySelector('thead');
            thead.style.transform = `translate(0,${this.scrollTop}px)`;
        });
}
