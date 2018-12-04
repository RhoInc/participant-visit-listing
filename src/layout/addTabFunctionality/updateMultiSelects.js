export default function updateMultiSelects() {
    const context = this;

    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.multiple)
        .selectAll('select')
        .each(function(d) {
            const filter = context.data.filters.find(filter => filter.col === d.value_col);
            const options = d3
                .select(this)
                .attr('size', 2)
                .selectAll('option');
            options.property(
                'selected',
                d => filter.value === 'All' || filter.value.indexOf(d) > -1
            );
        });
}
