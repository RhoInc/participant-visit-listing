import rectAttributes from './addVisitExpectationLegend/rectAttributes';
import textAttributes from './addVisitExpectationLegend/textAttributes';
import innerCircleAttributes from './addVisitExpectationLegend/innerCircleAttributes';
import outerCircleAttributes from './addVisitExpectationLegend/outerCircleAttributes';

export default function addVisitExpectationLegend() {
    this.containers.visitExpectationLegend = {
        g: this.containers.visitExpectationLegendContainer
            .append('svg')
            .attr({
                width: 400,
                height: this.containers.tabContainer.node().offsetHeight
            })
            .append('g')
            .classed('pvl-mark-legend', true)
    };

    //past visits
    this.containers.visitExpectationLegend.past = {
        g: this.containers.visitExpectationLegend.g
            .append('g')
            .classed('pvl-mark-legend__item pvl-mark-legend__item--past', true)
            .attr({
                transform: `translate(0,${4})`
            })
    };
    this.containers.visitExpectationLegend.past.rect = this.containers.visitExpectationLegend.past.g
        .append('rect')
        .attr(rectAttributes.call(this));
    this.containers.visitExpectationLegend.past.outerCircle = this.containers.visitExpectationLegend.past.g
        .append('circle')
        .attr(outerCircleAttributes.call(this));
    this.containers.visitExpectationLegend.past.text = this.containers.visitExpectationLegend.past.g
        .append('text')
        .attr(textAttributes.call(this).attr)
        .style(textAttributes.call(this).style);
    this.containers.visitExpectationLegend.past.text
        .selectAll('tspan')
        .data(this.data.sets.past_visits)
        .enter()
        .append('tspan')
        .attr(
            'fill',
            d =>
                this.data.sets.visit_status_col
                    .find(visit_status => visit_status.split(':|:')[1] === d)
                    .split(':|:')[2]
        )
        .text((d, i) => d);
    this.containers.visitExpectationLegend.past.text.html(
        this.containers.visitExpectationLegend.past.text
            .html()
            .replace('</tspan><tspan', '</tspan>/<tspan')
    );

    //future visits
    this.containers.visitExpectationLegend.future = {
        g: this.containers.visitExpectationLegend.g
            .append('g')
            .classed('pvl-mark-legend__item pvl-mark-legend__item--future', true)
            .attr({
                transform: `translate(0,${4 * 2 + this.settings.ordinalChartSynced.y.range_band})`
            })
    };
    this.containers.visitExpectationLegend.future.rect = this.containers.visitExpectationLegend.future.g
        .append('rect')
        .attr(rectAttributes.call(this));
    this.containers.visitExpectationLegend.future.outerCircle = this.containers.visitExpectationLegend.future.g
        .append('circle')
        .attr(outerCircleAttributes.call(this));
    this.containers.visitExpectationLegend.future.innerCircle = this.containers.visitExpectationLegend.future.g
        .append('circle')
        .attr(innerCircleAttributes.call(this));
    this.containers.visitExpectationLegend.future.text = this.containers.visitExpectationLegend.future.g
        .append('text')
        .attr(textAttributes.call(this).attr)
        .style(textAttributes.call(this).style);
    this.containers.visitExpectationLegend.future.text
        .selectAll('tspan')
        .data(this.data.sets.future_visits)
        .enter()
        .append('tspan')
        .attr(
            'fill',
            d =>
                this.data.sets.visit_status_col
                    .find(visit_status => visit_status.split(':|:')[1] === d)
                    .split(':|:')[2]
        )
        .text((d, i) => d);
    this.containers.visitExpectationLegend.future.text.html(
        this.containers.visitExpectationLegend.future.text
            .html()
            .replace('</tspan><tspan', '</tspan>/<tspan')
    );
}