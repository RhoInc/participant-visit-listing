import lineAttributes from './lineAttributes';

export default function addReferenceLine() {
    this.highlight.referenceLine = this.highlight.container
        .append('line')
        .classed('pvl-highlighted-visit-mark pvl-highlighted-visit-mark--reference-line', true)
        .attr({
            x1: this.x(this.highlight.referenceDay),
            x2: this.x(this.highlight.referenceDay),
            y1: 0,
            y2: this.plot_height,
            ...lineAttributes
        });
    this.highlight.referenceLine.append('title').text(this.highlight.tooltip);
}
