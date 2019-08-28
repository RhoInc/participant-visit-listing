import rectAttributes from './addVisitExpectationLegend/rectAttributes';
import textAttributes from './addVisitExpectationLegend/textAttributes';
import innerCircleAttributes from './addVisitExpectationLegend/innerCircleAttributes';
import outerCircleAttributes from './addVisitExpectationLegend/outerCircleAttributes';

// FIXME: modularize/figure out a better way to attach the SVG elements to the visitExpectationLegend object.
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

    // past visits
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
        .classed('pvl-legend-rect pvl-legend-rect--past', true)
        .attr(rectAttributes.call(this));
    this.containers.visitExpectationLegend.past.outerCircle = this.containers.visitExpectationLegend.past.g
        .append('circle')
        .classed('pvl-legend-circle pvl-legend-circle--outer pvl-legend-circle--past', true)
        .attr(outerCircleAttributes.call(this));
    this.containers.visitExpectationLegend.past.text = this.containers.visitExpectationLegend.past.g
        .append('text')
        .classed('pvl-legend-text pvl-legend-text--past', true)
        .attr(textAttributes.call(this).attr)
        .style(textAttributes.call(this).style);
    this.containers.visitExpectationLegend.past.text
        .selectAll('tspan')
        .data(this.data.sets.past_visits)
        .enter()
        .append('tspan')
        .classed('pvl-legend-tspan pvl-legend-tspan--past', true)
        .attr(
            'fill',
            d =>
                this.data.sets.visit_status_col
                    .find(visit_status => visit_status.split(':|:')[1] === d)
                    .split(':|:')[2]
        )
        .text((d, i) => d);

    // future visits
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
        .classed('pvl-legend-rect pvl-legend-rect--future', true)
        .attr(rectAttributes.call(this));
    this.containers.visitExpectationLegend.future.outerCircle = this.containers.visitExpectationLegend.future.g
        .append('circle')
        .classed('pvl-legend-circle pvl-legend-circle--outer pvl-legend-circle--future', true)
        .attr(outerCircleAttributes.call(this));
    this.containers.visitExpectationLegend.future.innerCircle = this.containers.visitExpectationLegend.future.g
        .append('circle')
        .classed('pvl-legend-circle pvl-legend-circle--inner pvl-legend-circle--future', true)
        .attr(innerCircleAttributes.call(this));
    this.containers.visitExpectationLegend.future.text = this.containers.visitExpectationLegend.future.g
        .append('text')
        .classed('pvl-legend-text pvl-legend-text--future', true)
        .attr(textAttributes.call(this).attr)
        .style(textAttributes.call(this).style);
    this.containers.visitExpectationLegend.future.text
        .selectAll('tspan')
        .data(this.data.sets.future_visits)
        .enter()
        .append('tspan')
        .classed('pvl-legend-tspan pvl-legend-tspan--future', true)
        .attr(
            'fill',
            d =>
                this.data.sets.visit_status_col
                    .find(visit_status => visit_status.split(':|:')[1] === d)
                    .split(':|:')[2]
        )
        .text((d, i) => d);

    // Insert forward slashes (/) between each tspan.
    // We edit the inner HTML of a div because IE doesn't allow editing the inner HTML of an SVG element.
    const innerHTML = this.containers.visitExpectationLegendContainer.html();
    this.containers.visitExpectationLegendContainer.text('');
    this.containers.visitExpectationLegendContainer.html(
        innerHTML.replace(/<\/tspan><tspan/g, '</tspan>/<tspan')
    );
    this.containers.visitExpectationLegend.past.rect = this.containers.visitExpectationLegendContainer.select(
        'rect.pvl-legend-rect--past'
    );
    this.containers.visitExpectationLegend.future.rect = this.containers.visitExpectationLegendContainer.select(
        'rect.pvl-legend-rect--future'
    );
}
