export default function clearHighlight(element) {
    this.svg
        .selectAll('.mark1 .point circle, .text text')
        .attr({
            'fill-opacity': 1,
            'stroke-opacity': 1,
        });
    this.highlight.referenceLine.remove();
    this.highlight.referenceText.remove();
    this.highlight.points.selectAll('.pvl-highlighted-visit-mark--highlight-line').remove();
    delete this.highlight;
}
