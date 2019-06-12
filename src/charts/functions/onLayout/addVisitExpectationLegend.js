export default function addVisitExpectationLegend() {
    this.visitExpectationLegend = {
        g: this.topXAxis.svg
            .append('g')
            .classed('pvl-mark-legend', true)
            .attr({
                transform: `translate(-60,${-this.pvl.settings.chart_margin.top})`,
            })
    };

    //past visits
    this.visitExpectationLegend.past = this.visitExpectationLegend.g
        .append('g')
        .classed('pvl-mark-legend__item pvl-mark-legend__item--past', true)
        .attr({
            transform: `translate(0,${4})`
        });
    this.visitExpectationLegend.past.append('rect')
        .attr({
            x: 0,
            width: 100,
            y: 0,
            height: 10,
            fill: 'black',
        });
    this.visitExpectationLegend.past.append('text')
        .attr({
            x: 104,
            y: 14,
        })
        .text('Completed/Missed Visits');

    //future visits
    this.visitExpectationLegend.future = this.visitExpectationLegend.g
        .append('g')
        .classed('pvl-mark-legend__item pvl-mark-legend__item--future', true)
        .attr({
            transform: `translate(0,${24})`
        });
    this.visitExpectationLegend.future.append('rect')
        .attr({
            x: 0,
            width: 100,
            y: 0,
            height: 10,
            fill: 'black',
        });
    this.visitExpectationLegend.future.append('text')
        .attr({
            x: 104,
            y: 14,
        })
        .text('Expected/Overdue Visits');
    this.visitExpectationLegend.future.append('circle')
        .attr({
            cx: 50,
            cy: 5,
            r: this.config.marks[1].radius,
            fill: 'white',
        });
}
