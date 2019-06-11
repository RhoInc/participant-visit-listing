export default function attachBottomXAxis() {
    this.bottomXAxis = {
        svg: this.svg.select('.x.axis').classed('x--bottom', true)
    };
}
