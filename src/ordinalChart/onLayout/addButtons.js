import minimize from './addButtons/minimize';
import split from './addButtons/split';
import maximize from './addButtons/maximize';

export default function addButtons() {
    //Add minimize chart button.
    this.topXAxis.minimize = this.topXAxis.container
        .append('text')
        .classed('pvl-chart-button pvl-chart-button--minimize', true)
        .html('&minus;<title>Minimize chart</title')
        .attr('title', 'Minimize chart')
        .on('click', () => minimize.call(this));

    //Add split chart button.
    this.topXAxis.split = this.topXAxis.container
        .append('text')
        .classed('pvl-chart-button pvl-chart-button--split', true)
        .html('&#8418;&#8418;<title>View both charts</title>')
        .attr('title', 'View both chart')
        .on('click', () => split.call(this));

    //Add maximize chart button.
    this.topXAxis.maximize = this.topXAxis.container
        .append('text')
        .classed('pvl-chart-button pvl-chart-button--maximize', true)
        .html('&plus;<title>Maximize chart')
        .attr('title', 'Maximize chart')
        .on('click', () => maximize.call(this));
}
