export default function onDraw() {
    this.tbody
        .selectAll('tr')
        .each(function(d,i) {
            const row = d3.select(this);

            row.selectAll('td')
                .each(function(di,j) {
                    const cell = d3.select(this);
                    di.color = (d[`${di.col}-color`] || 'white').toLowerCase();

                    //Apply cell border coloring.
                    if (!/white/.test(di.color))
                        cell.style('border-bottom', `2px solid ${di.color === 'black' ? '#ccc' : di.color}`);

                    //Apply cell text coloring.
                    if (!/black|white/.test(di.color))
                        cell.style('color', di.color);
                });
        });

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

    //Float table header as user scrolls.
    this.wrap
        .on('scroll', function() {
            const thead = this.querySelector('thead');
            thead.style.transform = `translate(0,${this.scrollTop}px)`;
        });
var doc = new jsPDF();          
var elementHandler = {
  '#ignorePDF': function (element, renderer) {
    return true;
  }
};
var source = window.document.getElementsByTagName("body")[0];
doc.fromHTML(
    source,
    15,
    15,
    {
      'width': 180,'elementHandlers': elementHandler
    });

doc.output("dataurlnewwindow");
}
