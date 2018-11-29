export default function defineVisitSet() {
    this.data.sets.visit_col = d3
        .set(
            this.data.analysis.map(
                d => `${d[this.settings.visit_order_col]}:|:${d[this.settings.visit_col]}`
            )
        )
        .values()
        .filter(visit => !this.settings.visit_exclusion_regex.test(visit))
        .sort((a, b) => a.split(':|:')[0] - b.split(':|:')[0])
        .map(visit => visit.split(':|:')[1]);

    //Update ordinal chart settings.
    this.ordinalChart.config.x.domain = this.data.sets.visit_col;
    this.ordinalChart.config.marks[0].values[this.settings.visit_col] = this.data.sets.visit_col;
    this.ordinalChart.config.marks[1].values[this.settings.visit_col] = this.data.sets.visit_col;
}
