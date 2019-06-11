export default function clearHighlight(element) {
    this.svg
        .selectAll('.mark1 .point circle, .text text')
        .attr({
            'fill-opacity': 1,
            'stroke-opacity': 1,
        });
    this.highlight.container.remove();
    delete this.highlight;
}
