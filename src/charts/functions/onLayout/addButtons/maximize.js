export default function maximize() {
    const thisChart = this.property;
    const thatChart = this.property === 'linearChart' ? 'ordinalChart' : 'linearChart';
    this.pvl.containers[thatChart].classed('pvl-hidden', true);
    this.pvl.containers[thisChart].classed('pvl-hidden', false).style('width', '100%');
    this.pvl[thisChart].draw();
}
