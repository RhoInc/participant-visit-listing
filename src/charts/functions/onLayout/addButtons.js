import minimize from './addButtons/minimize';
import split from './addButtons/split';
import maximize from './addButtons/maximize';

export default function addButtons() {
    //Add minimize chart button.
    this.topXAxis.minimize = this.topXAxis.container
        .append('text')
        .classed('pvl-chart-button pvl-chart-button--minimize', true)
        .text('\u2212')
        .on('click', () => minimize.call(this));
    this.topXAxis.minimize.append('title').text('MinimizeChart');

    //Add split chart button.
    this.topXAxis.split = this.topXAxis.container
        .append('text')
        .classed('pvl-chart-button pvl-chart-button--split', true)
        .text('\u25A1\u25A1')
        .on('click', () => split.call(this));
    this.topXAxis.split.append('title').text('View both charts');

    //Add maximize chart button.
    this.topXAxis.maximize = this.topXAxis.container
        .append('text')
        .classed('pvl-chart-button pvl-chart-button--maximize', true)
        .text('\u002B')
        .on('click', () => maximize.call(this));
    this.topXAxis.maximize.append('title').text('Maximize Chart');
}
