export default function filterData(d, select) {
    const filter = this.data.filters.find(filter => filter.col === d.value_col);
    filter.value = select.multiple
        ? d3
              .select(select)
              .selectAll('option:checked')
              .data()
        : select.value;
    this.data.filtered = this.data.raw;
    this.data.filters.forEach(filter => {
        this.data.filtered = this.data.filtered.filter(
            di =>
                Array.isArray(filter.value)
                    ? filter.value.indexOf(di[filter.col]) > -1
                    : filter.value === 'All' || di[filter.col] === filter.value
        );
    });
}
