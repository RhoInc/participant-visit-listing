export default function updateMultiSelects() {
    const context = this;

    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.multiple)
        .selectAll('select')
        .attr('size', 2)
        .selectAll('option')
        .property('selected', true);
}
