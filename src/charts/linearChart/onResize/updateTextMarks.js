export default function updateTextMarks() {
    this.annotations
        .selectAll('text')
        .classed('pvl-unscheduled-annotation', true)
        .style('clip-path', null);
}
