export default function addVisitExpectationLegend() {
    this.visitExpectationLegend = {
        g: this.pvl.containers.tabContainer
            .insert('div', ':first-child')
            .style({
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'inline-block',
            })
            .append('svg')
            .attr({
                width: 400,
                height: this.pvl.containers.tabContainer.node().offsetHeight
            })
            .append('g')
            .classed('pvl-mark-legend', true)
            //.attr({
            //    transform: `translate(-60,${-this.pvl.settings.chart_margin.top})`,
            //})
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
            height: this.config.y.range_band,
            fill: 'green',
            'fill-opacity': 1,
            stroke: '#aaa',
        });
    this.visitExpectationLegend.past.append('text')
        .attr({
            x: 104,
            y: 12,
        })
        .style({
            'font-size': '12px',
        })
        .text('Completed/Missed');

    //future visits
    this.visitExpectationLegend.future = this.visitExpectationLegend.g
        .append('g')
        .classed('pvl-mark-legend__item pvl-mark-legend__item--future', true)
        .attr({
            transform: `translate(0,${4*2 + this.config.y.range_band})`
        });
    this.visitExpectationLegend.future.append('rect')
        .attr({
            x: 0,
            width: 100,
            y: 0,
            height: this.config.y.range_band,
            fill: 'green',
            'fill-opacity': 1,
            stroke: '#aaa',
        });
    this.visitExpectationLegend.future.append('text')
        .attr({
            x: 104,
            y: 12,
        })
        .style({
            'font-size': '12px',
        })
        .text('Expected/Overdue');
    this.visitExpectationLegend.future.append('circle')
        .attr({
            cx: 50,
            cy: this.config.y.range_band/2,
            r: this.config.marks[1].radius,
            fill: 'white',
        });
}
