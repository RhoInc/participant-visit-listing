export default function attachMarks() {
    this.points = this.marks.filter(mark => mark.type === 'circle')[0].groups;
    this.blanks = this.marks.filter(mark => mark.type === 'circle')[1].groups;
    this.annotations = this.marks.find(mark => mark.type === 'text').groups;
}
