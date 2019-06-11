export default function deemphasizeMarks() {
    this.points
        .selectAll('.point circle')
        .attr({
            'fill-opacity': .25,
            'stroke-opacity': .25,
        });
    this.svg.selectAll('.text text')
        .attr({
            'fill-opacity': .25,
            'stroke-opacity': .25,
        });
}
