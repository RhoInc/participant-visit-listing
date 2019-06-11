import { select, median } from 'd3';
import lineAttributes from './click/lineAttributes';
import clearHighlight from './click/clearHighlight';

export default function click(element, d) {
    const context = this;

    //Remove vertical line highlights.
    this.svg.selectAll('.pvl-highlighted-visit-mark').remove();

    //Select all points.
    const points = this.svg
        .selectAll('.point')
        .filter(d => d.mark.id === 'mark1')
        .classed('pvl-highlighted-visit', false);

    //Reduce opacity of all circles.
    points
        .selectAll('.point circle')
        .attr({
            'fill-opacity': .25,
            'stroke-opacity': .25,
        });
    this.svg.selectAll('.text text')
        .attr({
            'fill-opacity': .25,
            'stroke-opacity': .25,
        });

    //Capture selected visit value.
    this.highlight = {
        visit: d.values.raw[0][this.pvl.settings.visit_col]
    };

    //Select points representing selected visit value.
    this.highlight.points = points
        .filter(di => di.values.raw[0][this.pvl.settings.visit_col] === this.highlight.visit)
        .classed('pvl-highlighted-visit', true);

    //Append a reference line of the median study day of the selected visit.
    this.highlight.data = this.highlight.points.data()
        .sort((a,b) => (
            a.values.y < b.values.y ? -1 :
            b.values.y < a.values.y ?  1 :
            a.total - b.total
        ));
    this.highlight.firstMark = this.highlight.data[0];
    this.highlight.referenceDay = Math.round(median(this.highlight.data, d => d.total));
    this.highlight.referenceLine = this.svg
        .insert('line', '.mark1')
        .classed('pvl-highlighted-visit-mark pvl-highlighted-visit-mark--reference-line', true)
        .attr({
            x1: this.x(this.highlight.referenceDay),
            x2: this.x(this.highlight.referenceDay),
            y1: 0,
            y2: this.plot_height,
            ...lineAttributes
        })
        .on('click', () => clearHighlight.call(this));
    this.highlight.referenceLine
        .append('title')
        .text(`Median ${this.highlight.visit} study day: ${this.highlight.referenceDay}`);
    this.highlight.referenceText = this.svg
        .insert('text', '.mark1')
        .classed('pvl-highlighted-visit-mark pvl-highlighted-visit-mark--reference-text', true)
        .attr({
            x: this.x(this.highlight.referenceDay),
            dx: this.highlight.firstMark.total <= this.highlight.referenceDay ? 5 : -5,
            y: 0,
            dy: 5,
            'font-size': '12px',
            'text-anchor': this.highlight.firstMark.total <= this.highlight.referenceDay ? 'beginning' : 'end',
        })
        .text(this.highlight.visit)
        .on('click', () => clearHighlight.call(this));

    //Highlight points representing selected visit value.
    this.highlight.points
        .each(function(di) {
            const point = select(this);

            //Add a horizontal line to the reference line.
            const line = point
                .insert('line', ':first-child')
                .classed('pvl-highlighted-visit-mark pvl-highlighted-visit-mark--highlight-line', true)
                .attr({
                    x1: context.x(di.values.x),
                    x2: context.x(context.highlight.referenceDay),
                    y1: context.y(di.values.y) + context.y.rangeBand()/2,
                    y2: context.y(di.values.y) + context.y.rangeBand()/2,
                    ...lineAttributes
                });
            line.append('title')
                .text(`Number of days from reference study day: ${di.values.x - context.highlight.referenceDay}`);
            line.on('click', function() {
                console.log(this);
                clearHighlight.call(context, this);
            });

            //Increase opacity.
            point.select('circle')
                .attr({
                    'fill-opacity': 1,
                    'stroke-opacity': 1,
                });
        });
}
