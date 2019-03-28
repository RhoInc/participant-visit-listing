export default function toggleCellText() {
    if (this.pvl.settings.toggle_cell_text) {
        const context = this;

        this.cellTextToggle = {
            container: this.wrap
                .selectAll('.table-top')
                .insert('div', ':first-child')
                .classed('interactivity pvl-cell-text-toggle', true)
        };
        this.cellTextToggle.label = this.cellTextToggle.container
            .append('label')
            .classed('pvl-cell-text-toggle__label', true)
            .text('Display cell text');
        this.cellTextToggle.checkbox = this.cellTextToggle.label
            .append('input')
            .classed('pvl-cell-text-toggle__checkbox', true)
            .attr('type', 'checkbox')
            .property('checked', this.config.display_cell_text);
        this.cellTextToggle.checkbox.on('click', function() {
            context.config.display_cell_text = this.checked;
            context.draw();
        });
    }
}
