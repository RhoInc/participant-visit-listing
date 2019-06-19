export default function clearHighlight() {
    if (this.highlight) {
        //Remove highlight lines and visit annotation.
        this.highlight.container.remove();

        //De-class highlighted circles and reset their opacity.
        this.points
            .classed('pvl-highlighted-visit', false)
            .selectAll('circle')
            .attr({
                'fill-opacity': 1,
                'stroke-opacity': 1
            });

        //Reset annotation opacity.
        this.annotations.selectAll('text').attr({
            'fill-opacity': 1,
            'stroke-opacity': 1
        });

        delete this.highlight;
    }
}
