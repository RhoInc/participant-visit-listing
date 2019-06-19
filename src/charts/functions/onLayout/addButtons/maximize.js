import loading from '../../../../util/loading';

export default function maximize() {
    loading.call(this.pvl, `${this.property}.maximize()`, () => {
        const thisChart = this.property;
        const thatChart = this.property === 'linearChart' ? 'ordinalChart' : 'linearChart';
        this.pvl.containers[thatChart].classed('pvl-hidden', true);
        this.pvl.containers[thisChart].classed('pvl-hidden', false).style('width', '100%');
        this.pvl[thisChart].draw();
        this.pvl.containers.visitExpectationLegend.past.rect.classed(
            'pvl-hidden',
            thisChart === 'linearChart'
        );
        this.pvl.containers.visitExpectationLegend.future.rect.classed(
            'pvl-hidden',
            thisChart === 'linearChart'
        );
    });
}
