export default function positionButtons() {
    this.topXAxis.minimize.attr({
        transform: 'translate(' + (this.plot_width - 60) + ',' + -(this.margin.top - 24) + ')',
        'text-anchor': 'middle'
    });
    this.topXAxis.split.attr({
        transform: 'translate(' + (this.plot_width - 35) + ',' + -(this.margin.top - 18) + ')',
        'text-anchor': 'middle'
    });
    this.topXAxis.maximize.attr({
        transform: 'translate(' + (this.plot_width - 10) + ',' + -(this.margin.top - 24) + ')',
        'text-anchor': 'middle'
    });
}
