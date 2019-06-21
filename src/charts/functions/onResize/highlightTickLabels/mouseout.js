export default function mousemove(mouse) {
    //x
    if (this.config.x.type === 'ordinal') {
        this.wrap.selectAll('.x.axis .tick line').style({
            stroke: '#eee',
            'stroke-width': 1
        });
        this.wrap.selectAll('.x.axis .tick text').attr('font-weight', 'normal');
    } else {
        this.topXAxis.svg.select('.tick--highlight').remove();
    }

    //y
    this.wrap.selectAll('.y.axis .tick line').style({
        stroke: '#eee',
        'stroke-width': 1
    });
    this.wrap.selectAll('.y.axis .tick text').attr('font-weight', 'normal');
}
