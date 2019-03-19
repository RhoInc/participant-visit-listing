export default function checkFilterCols(filterCol) {
    this.data.missingVariables[filterCol] = this.data.variables.indexOf(filterCol) > -1;
    if (!this.data.missingVariables[filterCol]) {
        this.settings.controlsSynced.inputs = this.settings.controlsSynced.inputs.filter(
            input => input.value_col !== filterCol
        );
        this.ordinalChart.controls.config.inputs = this.ordinalChart.controls.config.inputs.filter(
            input => input.value_col !== filterCol
        );
        this.linearChart.controls.config.inputs = this.linearChart.controls.config.inputs.filter(
            input => input.value_col !== filterCol
        );
        this.listing.controls.config.inputs = this.listing.controls.config.inputs.filter(
            input => input.value_col !== filterCol
        );
    } else {
        this.data.filters.push({
            col: filterCol,
            value: 'All'
        });
    }
}
