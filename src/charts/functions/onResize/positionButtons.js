export default function positionButtons() {
    this.topXAxis.minimize.attr({
        transform: `translate(${this.plot_width - 60},-${this.pvl.settings.chart_margin.top - 25})`,
        'text-anchor': 'middle'
    });
    this.topXAxis.split.attr({
        transform: `translate(${this.plot_width - 35},-${this.pvl.settings.chart_margin.top - 25 + 6})`,
        'text-anchor': 'middle'
    });
    this.topXAxis.maximize.attr({
        transform: `translate(${this.plot_width - 10},-${this.pvl.settings.chart_margin.top - 25})`,
        'text-anchor': 'middle'
    });
}
