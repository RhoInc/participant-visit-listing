export default function clearSort() {
    //Clear sort if visit is not in analysis subset.
    if (
        this.sortable.order.some(
            item =>
                this.config.cols.map(col => col.replace('-date', '')).includes(item.col) === false
        )
    ) {
        this.sortable.order = [];

        //Remove sort buttons.
        this.sortable.wrap.selectAll('.wc-button.sort-box').remove();

        //Display sorting instruction.
        this.sortable.wrap.select('.instruction').classed('hidden', false);
    }
}
