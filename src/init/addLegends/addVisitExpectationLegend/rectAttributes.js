export default function rectAttributes() {
    return {
        x: 0,
        width: 100,
        y: 0,
        height: this.settings.ordinalChartSynced.y.range_band,
        fill: 'black',
        'fill-opacity': 1,
        stroke: '#aaa'
    };
}
