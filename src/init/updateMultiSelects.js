export default function updateMultiSelects() {
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.multiple)
            .select('select')
            .attr('size', 2)
                .selectAll('option')
                .property('selected', true);
}
