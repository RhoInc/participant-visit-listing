export default function layout() {
    this.containers = {
        main: d3.select(this.element)
            .append('div')
            .classed('participant-visit-listing', true)
            .attr('id', `participant-visit-listing${d3.selectAll('.participant-visit-listing').size() + 1}`)
    };

    this.containers.upperRow = this.containers.main
        .append('div')
        .classed('pvl-row pvl-row--upper', true);
        this.containers.controls = this.containers.upperRow
            .append('div')
            .classed('pvl-controls', true);
        this.containers.legend = this.containers.upperRow
            .append('div')
            .classed('pvl-legend', true);

    this.containers.lowerRow = this.containers.main
        .append('div')
        .classed('pvl-row pvl-row--lower', true);
        this.containers.charts = this.containers.lowerRow
            .append('div')
            .classed('pvl-charts pvl-hidden', true);
            this.containers.ordinalChart = this.containers.charts
                .append('div')
                .classed('pvl-chart pvl-chart--ordinal', true);
            this.containers.linearChart = this.containers.charts
                .append('div')
                .classed('pvl-chart pvl-chart--linear', true);
        this.containers.listing = this.containers.lowerRow
            .append('div')
            .classed('pvl-listing', true);
}
