export default function outerCircleAttributes() {
    return {
        cx: 50,
        cy: this.settings.ordinalChartSynced.y.range_band / 2,
        r: this.settings.linearChartSynced.marks[0].radius,
        fill: 'black',
        stroke: 'black'
    };
}
