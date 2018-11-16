export default function minimize() {
    this.pvl.containers.ordinalChart.classed('pvl-hidden', false).style('width', '100%');
    this.pvl.containers.linearChart.classed('pvl-hidden', true);
    this.pvl.ordinalChart.draw();
}
