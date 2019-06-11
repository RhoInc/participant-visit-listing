import deemphasizeMarks from './highlightVisit/click/deemphasizeMarks';

export default function maintainHighlight() {
    if (this.highlight) {
        deemphasizeMarks.call(this);
        this.highlight.points
            .selectAll('circle')
            .attr({
                'fill-opacity': 1,
                'stroke-opacity': 1,
            });
    }
}
