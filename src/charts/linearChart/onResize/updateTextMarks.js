export default function updateTextMarks() {
    this.marks
        .find(mark => mark.type === 'text')
        .texts.classed('pvl-unscheduled-annotation', true)
        .style('clip-path', null);
}
