export default function rotateXAxisTickLabels() {
    //Rotate top x-axis tick labels.
    const topXAxisTickLabels = this.topXAxisG.selectAll('.tick text');
    topXAxisTickLabels
        .attr({
            transform: 'rotate(-45)'
        })
        .style('text-anchor', 'start');

    //Rotate bottom x-axis tick labels.
    const bottomXAxisTickLabels = this.bottomXAxisG.selectAll('.tick text');
    bottomXAxisTickLabels
        .attr({
            transform: 'rotate(-45)'
        })
        .style('text-anchor', 'end');
}
