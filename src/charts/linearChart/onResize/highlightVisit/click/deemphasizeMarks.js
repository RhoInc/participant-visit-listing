export default function deemphasizeMarks() {
    this.points.selectAll('circle').attr({
        'fill-opacity': 0.25,
        'stroke-opacity': 0.25
    });
    this.blanks.selectAll('circle').attr({
        'stroke-opacity': 0.25
    });
    this.annotations.selectAll('text').attr({
        'fill-opacity': 0.25,
        'stroke-opacity': 0.25
    });
}
