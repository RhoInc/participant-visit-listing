import { set } from 'd3';

export default function updateNOverdueOptions() {
    //Define new set of nOverdue options with analysis data.
    const nOverdue = ['All', ...d3.set(this.data.analysis.map(d => d.nOverdue)).values()];

    //Upate options in # of Overdue Visits dropdown.
    const nOverdueOptions = this.controls.wrap
        .selectAll('.control-group select')
        .filter(d => d.value_col === 'nOverdue')
        .selectAll('option')
        .data(nOverdue);
    nOverdueOptions
        .enter()
        .append('option')
        .text(d => d);
    nOverdueOptions.exit().remove();

    //Update nOverdue filter if the currently selected option doesn't exist in the new set of nOverdue options.
    const nOverdueFilter = this.data.filters.find(filter => filter.col === 'nOverdue');
    if (nOverdue.indexOf(nOverdueFilter.value) < 0) {
        nOverdueFilter.value = 'All';
        nOverdueOptions.property('selected', d => d === 'All');
    }
}
