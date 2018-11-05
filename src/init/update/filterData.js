export default function filterData(d, select) {
    this.data.filters.find(filter => filter.col === d.value_col).value = select.value;
    this.data.filtered = this.data.raw;
    this.data.filters.forEach(filter => {
        this.data.filtered = this.data.filtered.filter(
            di => di[filter.col] === filter.value || filter.value === 'All'
        );
    });
}
