export default function attachMarks() {
    this.points = this.svg.selectAll('.point').filter(d => d.mark.id === 'mark1');
    this.blanks = this.svg.selectAll('.point').filter(d => d.mark.id === 'mark2');
    this.annotations = this.svg.selectAll('.text');
}
