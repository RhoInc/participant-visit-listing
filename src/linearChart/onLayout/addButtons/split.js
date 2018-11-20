export default function split() {
    this.pvl.containers.ordinalChart.classed('pvl-hidden', false).style('width', '49.5%');
    this.pvl.ordinalChart.draw();
    this.pvl.containers.linearChart.classed('pvl-hidden', false).style('width', '49.5%');
    this.pvl.linearChart.draw();
}
