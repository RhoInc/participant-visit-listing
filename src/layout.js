import { select } from 'd3';
import tabs from './layout/tabs';
import addTabFunctionality from './layout/addTabFunctionality';

export default function layout() {
    const context = this;

    this.containers = {
        main: select(this.element)
            .append('div')
            .datum(this)
            .classed('participant-visit-listing', true)
            .attr('id', `participant-visit-listing${this.document.querySelectorAll('.participant-visit-listing').length}`)
    };

    /**-------------------------------------------------------------------------------------------\
      Upper row
    \-------------------------------------------------------------------------------------------**/

        this.containers.upperRow = this.containers.main
            .append('div')
            .classed('pvl-row pvl-row--upper', true);
            this.containers.legend = this.containers.upperRow
                .append('div')
                .classed('pvl-legend', true);
            this.containers.controls = this.containers.upperRow
                .append('div')
                .classed('pvl-controls', true);

    /**-------------------------------------------------------------------------------------------\
      Lower row
    \-------------------------------------------------------------------------------------------**/

        this.containers.lowerRow = this.containers.main
            .append('div')
            .classed('pvl-row pvl-row--lower', true);

            // tabs
            const selectedTabs = tabs
                .filter(tab => {
                    return (
                        this.settings.chart_layout === 'tabbed'
                            ? tab.name !== 'Charts'
                            : this.settings.chart_layout === 'side-by-side'
                                ? ['Visit Chart', 'Study Day Chart'].indexOf(tab.name) < 0
                                : true
                    );
                });
            this.containers.tabContainer = this.containers.lowerRow
                .append('div')
                .classed('pvl-tabs', true);
                this.containers.visitExpectationLegendContainer = this.containers.tabContainer
                    .append('div')
                    .classed('pvl-visit-expectation-legend pvl-hidden', true);
                this.containers.nParticipants = this.containers.tabContainer
                    .append('div')
                    .classed('pvl-viewing-n-participants', true)
                    .html('Viewing <span class = "pvl-n-participants"></span> participants.');
                this.containers.loading = this.containers.tabContainer
                    .append('div')
                    .classed('pvl-hidden pvl-loading', true);
                    this.containers.loading
                            .selectAll('div.pvl-loading-ball')
                                .data([1,2,3])
                                .enter()
                            .append('div')
                            .attr('class', d => `pvl-loading-ball pvl-loading-ball--${d}`);
                this.containers.tabs = this.containers.tabContainer
                    .selectAll('div.pvl-tab')
                        .data(selectedTabs)
                        .enter()
                    .append('div')
                    .attr('class', d => `pvl-tab pvl-tab--${d.class} ${d.name === this.settings.active_tab ? 'pvl-tab--active' : ''}`)
                    .text(d => d.name);

            // display containers
            if (this.settings.chart_layout === 'tabbed') {
                this.containers.ordinalChart = this.containers.lowerRow
                    .append('div')
                    .classed('pvl-display pvl-chart pvl-chart--ordinal pvl-chart--full', true);
                this.containers.linearChart = this.containers.lowerRow
                    .append('div')
                    .classed('pvl-display pvl-chart pvl-chart--linear pvl-chart--full', true);
            } else {
                this.containers.charts = this.containers.lowerRow
                    .append('div')
                    .classed('pvl-charts', true);
                    this.containers.ordinalChart = this.containers.charts
                        .append('div')
                        .classed('pvl-display pvl-chart pvl-chart--ordinal pvl-chart--side-by-side', true);
                    this.containers.linearChart = this.containers.charts
                        .append('div')
                        .classed('pvl-display pvl-chart pvl-chart--linear pvl-chart--side-by-side', true);
            }
            this.containers.listing = this.containers.lowerRow
                .append('div')
                .classed('pvl-display pvl-listing', true);

    /**-------------------------------------------------------------------------------------------\
      Functionality
    \-------------------------------------------------------------------------------------------**/

        addTabFunctionality.call(this);
}
