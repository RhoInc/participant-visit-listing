import loading from '../../../../util/loading';

export default function minimize() {
    loading.call(this.pvl, `${this.property}.minimize()`, () => {
        const thisChart = this.property;
        const thatChart = this.property === 'linearChart' ? 'ordinalChart' : 'linearChart';
        this.pvl.containers[thisChart].classed('pvl-hidden', true);
        this.pvl.containers[thatChart].classed('pvl-hidden', false).style('width', '100%');
        this.pvl[thatChart].draw();
        this.pvl.containers.visitExpectationLegend.past.rect.classed(
            'pvl-hidden',
            thatChart === 'linearChart'
        );
        this.pvl.containers.visitExpectationLegend.future.rect.classed(
            'pvl-hidden',
            thatChart === 'linearChart'
        );
    });
}
