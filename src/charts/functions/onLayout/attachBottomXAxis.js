export default function attachBottomXAxis() {
    this.bottomXAxis = {
        container: this.svg.select('.x.axis').classed('x--bottom', true)
    };
}
