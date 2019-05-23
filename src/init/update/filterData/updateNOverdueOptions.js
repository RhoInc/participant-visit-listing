export default function updateNOverdueOptions() {
    const nOverdue = ['All', ...d3.set(this.data.analysis.map(d => d.nOverdue)).values()];
    const nOverdueOptions = this.controls.wrap
        .selectAll('.control-group select')
        .filter(d => d.value_col === 'nOverdue')
        .selectAll('option')
        .data(nOverdue);
    nOverdueOptions.enter().append('option').text(d => d);
    nOverdueOptions.exit().remove();

    ['ordinalChart', 'linearChart', 'listing'].forEach(display => {
        console.log(this[display].filters);
        //this[display].filters.find(filter => filter.col === 'nOverdue').value = 'All';
    });
}
