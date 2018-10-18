export default function checkFilterCols(filterCol) {
    this.data.missingVariables[filterCol] = this.data.variables.indexOf(filterCol) > -1;
    if (!this.data.missingVariables[filterCol])
        this.settings.controlsSynced.inputs = this.settings.controlsSynced.inputs.filter(
            input => input.value_col !== filterCol
        );
}
