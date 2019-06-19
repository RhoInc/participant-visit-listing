export default function deemphasizeMarks() {
    this.points.selectAll('.point circle').attr({
        'fill-opacity': 0.25,
        'stroke-opacity': 0.25
    });
    this.svg.selectAll('.text text').attr({
        'fill-opacity': 0.25,
        'stroke-opacity': 0.25
    });
}
