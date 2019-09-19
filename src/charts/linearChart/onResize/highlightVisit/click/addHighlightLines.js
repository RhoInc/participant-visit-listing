import { select } from 'd3';
import lineAttributes from './lineAttributes';

export default function addHighlightLines() {
    const context = this;

    this.highlight.points.each(function(di) {
        const point = select(this);

        // Add a horizontal line to the reference line.
        const line = context.highlight.container
            .append('line')
            .classed('pvl-highlighted-visit-mark pvl-highlighted-visit-mark--highlight-line', true)
            .attr({
                x1: context.x(di.values.x),
                x2: context.x(context.highlight.referenceDay),
                y1: context.y(di.values.y) + context.y.rangeBand() / 2,
                y2: context.y(di.values.y) + context.y.rangeBand() / 2,
                ...lineAttributes
            });
        line.append('title').text(
            `Number of days from reference study day: ${di.values.x -
                context.highlight.referenceDay}\nClick to clear highlighting.`
        );

        // Increase opacity.
        point.selectAll('circle').attr({
            'fill-opacity': 1,
            'stroke-opacity': 1
        });
    });
}
