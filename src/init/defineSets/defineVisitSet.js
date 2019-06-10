import { set } from 'd3';

export default function defineVisitSet() {
    this.data.sets.visits = set(
        this.data.analysis.map(
            d => `${d[this.settings.visit_order_col]}:|:${d[this.settings.visit_col]}`
        )
    ).values();
    this.data.sets.visit_col = this.data.sets.visits
        .filter(visit =>
            this.settings.visit_exclusion_regex
                ? !this.settings.visit_exclusion_regex.test(visit)
                : true
        )
        .sort((a, b) => a.split(':|:')[0] - b.split(':|:')[0])
        .map(visit => visit.split(':|:')[1]);
    this.data.sets.scheduledVisits = this.data.sets.visit_col;
    this.data.sets.unscheduledVisits = set(
        this.data.sets.visits
            .filter(visit =>
                this.settings.visit_exclusion_regex
                    ? this.settings.visit_exclusion_regex.test(visit)
                    : false
            )
            .sort((a, b) => a.split(':|:')[0] - b.split(':|:')[0])
            .map(order_visit => {
                const visit = order_visit.split(':|:')[1];
                const extra = visit.replace(this.settings.visit_exclusion_regex, '');
                const yesPlease = visit.replace(extra, '');

                return yesPlease;
            })
    )
        .values()
        .sort();

    //Update ordinal chart settings.
    this.ordinalChart.config.x.domain = this.data.sets.visit_col;
    this.ordinalChart.config.marks[0].values[this.settings.visit_col] = this.data.sets.visit_col;
    this.ordinalChart.config.marks[1].values[this.settings.visit_col] = this.data.sets.visit_col;
}
