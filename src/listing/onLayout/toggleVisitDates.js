export default function toggleVisitDates() {
    const context = this;
    this.display_dates = false;

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
        context.display_dates = this.checked;
        context.draw();
    });
}
