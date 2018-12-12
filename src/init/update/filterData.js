export default function filterData(d, select) {
    const filter = this.data.filters.find(filter => filter.col === d.value_col);
    filter.value = select.multiple
        ? d3
              .select(select)
              .selectAll('option:checked')
              .data()
        : select.value;

    //Apply analysis filters to raw data.
    this.data.analysis = this.data.raw;
    this.data.filters.filter(filter => /^subset\d$/i.test(filter.col)).forEach(filter => {
        this.data.analysis = this.data.analysis.filter(
            di =>
                Array.isArray(filter.value)
                    ? filter.value.indexOf(di[filter.col]) > -1
                    : filter.value === 'All' || di[filter.col] === filter.value
        );
    });

    //Apply other filters to analysis data.
    this.data.filtered = this.data.analysis;
    this.data.filters.filter(filter => !/^subset\d$/i.test(filter.col)).forEach(filter => {
        this.data.filtered = this.data.filtered.filter(
            di =>
                Array.isArray(filter.value)
                    ? filter.value.indexOf(di[filter.col]) > -1
                    : filter.value === 'All' || di[filter.col] === filter.value
        );
    });
}
