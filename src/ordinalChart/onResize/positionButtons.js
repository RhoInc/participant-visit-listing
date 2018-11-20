export default function positionButtons() {
    this.topXAxis.minimize.attr({
        transform: 'translate(' + (this.plot_width - 50) + ',' + -(this.margin.top - 20) + ')',
        'text-anchor': 'middle'
    });
    this.topXAxis.split.attr({
        transform: 'translate(' + (this.plot_width - 30) + ',' + -(this.margin.top - 16) + ')',
        'text-anchor': 'middle'
    });
    this.topXAxis.maximize.attr({
        transform: 'translate(' + (this.plot_width - 10) + ',' + -(this.margin.top - 20) + ')',
        'text-anchor': 'middle'
    });
}
