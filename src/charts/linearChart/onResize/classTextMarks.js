export default function classTextMarks() {
    this.marks.find(mark => mark.type === 'text').texts.classed('pvl-unscheduled-annotation', true);
}
