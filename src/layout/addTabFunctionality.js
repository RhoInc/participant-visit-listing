import loading from '../util/loading';
import { select } from 'd3';
import update from '../init/update';
import updateSelects from './addTabFunctionality/updateSelects';
import updateMultiSelects from './addTabFunctionality/updateMultiSelects';
import addResetButton from '../init/addResetButton';

export default function addTabFunctionality() {
    const context = this;

    this.containers.tabs.on('click', function(d) {
        loading.call(context, `this.containers.tabs.${d.property} click`, () => {
            context.settings.active_tab = d.name;
            const tab = select(this);
            const active = tab.classed('pvl-tab--active');

            // Update active display(s).
            context.displays
                .forEach(display => {
                    display.active = display.tabs.includes(d.name);
                });

            if (!active) {
                context.containers.tabs.classed('pvl-tab--active', false);
                tab.classed('pvl-tab--active', true);
                if (context.settings.chart_layout === 'tabbed') {
                    context.containers.ordinalChart.classed('pvl-hidden', true);
                    context.containers.linearChart.classed('pvl-hidden', true);
                } else context.containers.charts.classed('pvl-hidden', true);
                context.containers.listing.classed('pvl-hidden', true);
                context.containers[d.property].classed('pvl-hidden', false);

                if (d.name === 'Listing') {
                    //Initialize or draw listing.
                    if (context.listing.initialized) context.listing.draw(context.data.transposed);
                    else {
                        context.listing.init(context.data.transposed, context.test);
                        update.call(context);
                        updateSelects.call(context);
                        updateMultiSelects.call(context);
                        addResetButton.call(context);
                    }
                    context.containers.visitExpectationLegendContainer.classed('pvl-hidden', true);
                } else if (d.name === 'Visit Chart') {
                    //Initialize or draw ordinal chart.
                    if (context.ordinalChart.initialized)
                        context.ordinalChart.draw(context.data.filtered);
                    else {
                        context.ordinalChart.init(context.data.filtered, context.test);
                        update.call(context);
                        updateSelects.call(context);
                        updateMultiSelects.call(context);
                        addResetButton.call(context);
                    }
                    context.containers.visitExpectationLegendContainer.classed('pvl-hidden', false);
                    context.containers.visitExpectationLegend.past.rect.classed(
                        'pvl-hidden',
                        false
                    );
                    context.containers.visitExpectationLegend.future.rect.classed(
                        'pvl-hidden',
                        false
                    );
                } else if (d.name === 'Study Day Chart') {
                    //Initialize or draw linear chart.
                    if (context.linearChart.initialized)
                        context.linearChart.draw(context.data.filtered);
                    else {
                        context.linearChart.init(context.data.filtered, context.test);
                        update.call(context);
                        updateSelects.call(context);
                        updateMultiSelects.call(context);
                        addResetButton.call(context);
                    }
                    context.containers.visitExpectationLegendContainer.classed('pvl-hidden', false);
                    context.containers.visitExpectationLegend.past.rect.classed('pvl-hidden', true);
                    context.containers.visitExpectationLegend.future.rect.classed(
                        'pvl-hidden',
                        true
                    );
                } else if (d.name === 'Charts') {
                    //Initialize or draw ordinal chart.
                    if (context.ordinalChart.initialized)
                        context.ordinalChart.draw(context.data.filtered);
                    else {
                        context.ordinalChart.init(context.data.filtered, context.test);
                    }

                    //Initialize or draw linear chart.
                    if (context.linearChart.initialized)
                        context.linearChart.draw(context.data.filtered);
                    else {
                        context.linearChart.init(context.data.filtered, context.test);
                        update.call(context);
                        updateSelects.call(context);
                        updateMultiSelects.call(context);
                        addResetButton.call(context);
                    }
                    context.containers.visitExpectationLegendContainer.classed('pvl-hidden', false);
                    context.containers.visitExpectationLegend.past.rect.classed(
                        'pvl-hidden',
                        context.containers.ordinalChart.classed('pvl-hidden')
                    );
                    context.containers.visitExpectationLegend.future.rect.classed(
                        'pvl-hidden',
                        context.containers.ordinalChart.classed('pvl-hidden')
                    );
                }
            }
        });
    });
}
