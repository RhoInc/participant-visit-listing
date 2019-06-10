export default function addAnnotationLegend() {
    if (this.pvl.data.sets.unscheduledVisits.length)
        this.topXAxis.svg.selectAll('.pvl-unscheduled-legend-item').remove();
    this.pvl.data.sets.unscheduledVisits.forEach((visit, i) => {
        this.topXAxis.svg
            .append('text')
            .datum(visit)
            .classed('pvl-unscheduled-legend-item', true)
            .attr({
                transform: `translate(-${this.margin.left - 15},-${this.pvl.settings.chart_margin.top -
                    16 * (i + 1) -
                    3})`
            })
            .text(`${visit.substring(0, 1)} - ${visit} Visit`);
    });
}
