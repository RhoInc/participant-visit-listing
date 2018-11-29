export default function addAnnotationLegend() {
    if (this.pvl.data.sets.unscheduledVisits.length)
        this.pvl.data.sets.unscheduledVisits.forEach((visit, i) => {
            this.topXAxis.container
                .append('text')
                .datum(visit)
                .classed('pvl-unscheduled-legend-item', true)
                .attr({
                    transform: `translate(-${this.margin.left - 15},${-this.margin.top +
                        16 * (i + 1) +
                        3})`
                })
                .text(`${visit.substring(0, 1)} - ${visit} Visit`);
        });
}
