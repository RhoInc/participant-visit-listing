export default function rotateXAxisTickLabels() {
    //Rotate top x-axis tick labels.
    const topXAxisTickLabels = this.topXAxis.container.selectAll('.tick text');
    topXAxisTickLabels
        .attr({
            transform: 'rotate(-45)'
        })
        .style('text-anchor', 'start');

    //Rotate bottom x-axis tick labels.
    const bottomXAxisTickLabels = this.bottomXAxis.container.selectAll('.tick text');
    bottomXAxisTickLabels
        .attr({
            transform: 'rotate(-45)'
        })
        .style('text-anchor', 'end');
}
