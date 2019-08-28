export default function updateMultiSelects() {
    const context = this;

    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.multiple)
        .selectAll('select')
        .selectAll('option')
        .property('selected', true);
}
