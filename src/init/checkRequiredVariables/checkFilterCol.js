export default function checkFilterCols(filterCol) {
    this.data.missingVariables[filterCol] = this.data.variables.indexOf(filterCol) > -1;
    if (!this.data.missingVariables[filterCol])
        this.settings.controlsSynced.inputs = this.settings.controlsSynced.inputs.filter(
            input => input.value_col !== filterCol
        );
    else if (/subset/.test(filterCol)) {
        this.data.filters.push({
            col: filterCol,
            value: 'All'
        });
        this.settings.controlsSynced.inputs.find(input => input.value_col === filterCol).values = d3
            .set(this.data.raw.map(d => d[filterCol]))
            .values()
            .filter(value => !/^ *$/.test(value))
            .sort();
    }
}
