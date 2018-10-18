import update from './addLegend/update';

export default function addLegend() {
    this.containers.legendItems = this.containers.legend
        .append('ul')
        .classed('pvl-legend__ul', true)
        .selectAll('li.pvl-legend__li')
        .data(this.data.sets.visit_status_col.map(visit_status => visit_status.split(':|:')))
        .enter()
        .append('li')
        .classed('pvl-legend__li', true)
        .style({
            'border-bottom': d => `2px solid ${d[2] === 'black' ? '#ccc' : d[2]}`,
            color: d => d[2]
        });
    this.containers.legendItems.each(function(d) {
        const legendItem = d3.select(this);
        legendItem.append('span').classed('pvl-legend-item-label', true);
        legendItem
            .append('span')
            .classed('pvl-legend-item-info-icon', true)
            .html('&#9432')
            .style({
                color: d => d[2]
            })
            .attr('title', d => {
                let infoText;
                switch (d[1]) {
                    case 'In Window':
                        infoText = 'Visits in black have occurred.';
                        break;
                    case 'Expected':
                        infoText = 'Dates in blue are expected dates for future visits.';
                        break;
                    case 'Overdue':
                        infoText = 'Dates in Red are expected dates for overdue visits.';
                        break;
                    case 'Part':
                        infoText = '"Part" a visit partially entered into EDC.';
                        break;
                    default:
                        infoText = d[1];
                        break;
                }
                return infoText;
            });
    });
    update.call(this);
}
