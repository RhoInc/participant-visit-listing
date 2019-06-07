import loading from '../../../../util/loading';

export default function maximize() {
    loading.call(this.pvl, `${this.property}.maximize()`, () => {
        const thisChart = this.property;
        const thatChart = this.property === 'linearChart' ? 'ordinalChart' : 'linearChart';
        this.pvl.containers[thatChart].classed('pvl-hidden', true);
        this.pvl.containers[thisChart].classed('pvl-hidden', false).style('width', '100%');
        this.pvl[thisChart].draw();
    });
}
