export default function innerCircleAttributes() {
    return {
        cx: 50,
        cy: this.settings.ordinalChartSynced.y.range_band / 2,
        r: this.settings.ordinalChartSynced.marks[1].radius,
        fill: 'white',
        stroke: 'black'
    };
}
