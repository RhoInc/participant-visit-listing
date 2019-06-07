import loading from '../../../../util/loading';

export default function split() {
    loading.call(this.pvl, `${this.property}.split()`, () => {
        this.pvl.containers.ordinalChart.classed('pvl-hidden', false).style('width', '49.5%');
        this.pvl.ordinalChart.draw();
        this.pvl.containers.linearChart.classed('pvl-hidden', false).style('width', '49.5%');
        this.pvl.linearChart.draw();
    });
}
