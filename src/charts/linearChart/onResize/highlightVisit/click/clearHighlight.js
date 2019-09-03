export default function clearHighlight(deleteHighlight = true) {
    if (this.highlight) {
        // Remove highlight lines and visit annotation.
        if (deleteHighlight) {
            this.highlight.container.remove();
            delete this.highlight;
        } else {
            this.highlight.container.selectAll('*').remove();
        }

        // De-class highlighted circles and reset their opacity.
        this.points
            .classed('pvl-highlighted-visit', false)
            .selectAll('circle')
            .attr({
                'fill-opacity': 1,
                'stroke-opacity': 1
            });

        // Reset annotation opacity.
        this.annotations.selectAll('text').attr({
            'fill-opacity': 1,
            'stroke-opacity': 1
        });
    }
}
