import addTabFunctionality from './layout/addTabFunctionality';

export default function layout() {
    const context = this;

    this.containers = {
        main: d3.select(this.element)
            .append('div')
            .datum(this)
            .classed('participant-visit-listing', true)
            .attr('id', `participant-visit-listing${d3.selectAll('.participant-visit-listing').size() + 1}`)
    };

    /**-------------------------------------------------------------------------------------------\
      Upper row
    \-------------------------------------------------------------------------------------------**/

        this.containers.upperRow = this.containers.main
            .append('div')
            .classed('pvl-row pvl-row--upper', true);
            this.containers.controls = this.containers.upperRow
                .append('div')
                .classed('pvl-controls', true);
            this.containers.legend = this.containers.upperRow
                .append('div')
                .classed('pvl-legend', true);

    /**-------------------------------------------------------------------------------------------\
      Lower row
    \-------------------------------------------------------------------------------------------**/

        this.containers.lowerRow = this.containers.main
            .append('div')
            .classed('pvl-row pvl-row--lower', true);
            this.containers.tabContainer = this.containers.lowerRow
                .append('div')
                .classed('pvl-tabs', true);
                this.containers.loadingListing = this.containers.tabContainer
                    .append('div.pvl-loading')
                    .classed(`pvl-hidden pvl-loading pvl-loading--listing`, true);
                    this.containers.loadingListing
                            .selectAll('div.pvl-loading-ball')
                                .data([1,2,3])
                                .enter()
                            .append('div')
                            .attr('class', d => `pvl-loading-ball pvl-loading-ball--${d}`);
                this.containers.tabs = this.containers.tabContainer
                    .selectAll('div.pvl-tab')
                        .data(['Listing', 'Charts'])
                        .enter()
                    .append('div')
                    .attr('class', d => `pvl-tab pvl-tab--${d.toLowerCase()} ${d === this.settings.active_tab ? 'pvl-tab--active' : ''}`)
                    .text(d => d);
                this.containers.loadingCharts = this.containers.tabContainer
                    .append('div.pvl-loading')
                    .classed(`pvl-hidden pvl-loading pvl-loading--charts`, true);
                    this.containers.loadingCharts
                        .selectAll('div.pvl-loading-ball')
                            .data([1,2,3])
                            .enter()
                        .append('div')
                        .attr('class', d => `pvl-loading-ball pvl-loading-ball--${d}`);
            this.containers.charts = this.containers.lowerRow
                .append('div')
                .classed('pvl-charts', true);
                this.containers.ordinalChart = this.containers.charts
                    .append('div')
                    .classed('pvl-chart pvl-chart--ordinal', true);
                this.containers.linearChart = this.containers.charts
                    .append('div')
                    .classed('pvl-chart pvl-chart--linear', true);
            this.containers.listing = this.containers.lowerRow
                .append('div')
                .classed('pvl-listing', true);

    /**-------------------------------------------------------------------------------------------\
      Functionality
    \-------------------------------------------------------------------------------------------**/

        addTabFunctionality.call(this);
}
