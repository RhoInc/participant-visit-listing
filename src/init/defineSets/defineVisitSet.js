export default function defineVisitSet() {
    this.data.sets.visit_col = d3
        .set(
            this.data.filtered.map(
                d => `${d[this.settings.visit_order_col]}:|:${d[this.settings.visit_col]}`
            )
        )
        .values()
        .filter(visit => !this.settings.visit_exclusion_regex.test(visit))
        .sort((a, b) => a.split(':|:')[0] - b.split(':|:')[0])
        .map(visit => visit.split(':|:')[1]);

    //Update ordinal chart settings.
    this.ordinalChart.config.x.order = this.data.sets.visit_col
        .map(visit => visit.split(':|:')[1]);
}
