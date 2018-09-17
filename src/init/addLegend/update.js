export default function update() {
    this.containers.legendItems.text(
        d =>
            `${d[1]} (${
                this.data.filtered.length
                    ? d3.format('%')(
                          this.data.filtered.filter(
                              di => di[this.settings.rendererSynced.visit_status_col] === d[1]
                          ).length / this.data.filtered.length
                      )
                    : 'N/A'
            })`
    );
}
