export default function toggleVisitDates() {
    const context = this;

    this.cellVisitDatesToggle = {
        container: this.wrap
            .selectAll('.table-top')
            .insert('div', ':first-child')
            .classed('interactivity pvl-cell-text-toggle', true)
    };
    this.cellVisitDatesToggle.label = this.cellVisitDatesToggle.container
        .append('label')
        .classed('pvl-cell-text-toggle__label', true)
        .text('Display visit dates');
    this.cellVisitDatesToggle.checkbox = this.cellVisitDatesToggle.label
        .append('input')
        .classed('pvl-cell-text-toggle__checkbox', true)
        .attr('type', 'checkbox')
        .property('checked', false);
    this.cellVisitDatesToggle.checkbox.on('click', function() {
        context.config.cols = this.checked
            ? ['Site', 'ID', 'Status'].concat(context.pvl.data.sets.visit_col.map(visit => `${visit}-date`))
            : ['Site', 'ID', 'Status'].concat(context.pvl.data.sets.visit_col);
        context.draw();
    });
}
