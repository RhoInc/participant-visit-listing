export default function updateSelects() {
    const context = this;

    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => !d.multiple)
        .selectAll('select')
        .each(function(d) {
            const filter = context.data.filters
                .find(filter => filter.col === d.value_col);
            d3.select(this)
                .selectAll('option')
                .property('selected', d => filter.value === d);
        });
}
