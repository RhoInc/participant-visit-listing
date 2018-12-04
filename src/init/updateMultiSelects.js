export default function updateMultiSelects(initialized = false) {
    const multiSelects = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.multiple)
        .select('select');
    multiSelects.attr('size', 2);
    console.log(this.data.filters.find(filter => filter.col === this.settings.id_status_col));
    if (!initialized)
        multiSelects
            .selectAll('option')
            .property('selected', true);
}
