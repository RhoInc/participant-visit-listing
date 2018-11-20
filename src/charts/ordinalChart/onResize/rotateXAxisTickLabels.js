export default function rotateXAxisTickLabels() {
    //Rotate top x-axis tick labels.
    this.topXAxis.container
        .selectAll('.tick text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'start');

    //Rotate bottom x-axis tick labels.
    this.bottomXAxis.container
        .selectAll('.tick text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');
}
