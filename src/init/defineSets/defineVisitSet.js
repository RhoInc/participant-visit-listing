import { set } from 'd3';

export default function defineVisitSet() {
    //visit order/name/abbreviation set
    this.data.sets.visit_col = set(
        this.data.analysis.map(
            d =>
                `${d[this.settings.visit_order_col]}:|:${d[this.settings.visit_col]}:|:${
                    d[this.settings.visit_abbreviation_col]
                }`
        )
    )
        .values()
        .map(value => {
            const [order, name, abbreviation] = value.split(':|:');
            return {
                order,
                name,
                abbreviation
            };
        })
        .sort((a, b) => (a.order - b.order ? a.order - b.order : a.name < b.name ? -1 : 1));

    //scheduled visit set
    this.data.sets.scheduledVisits = this.data.sets.visit_col
        .filter(visit =>
            this.settings.visit_exclusion_regex
                ? !this.settings.visit_exclusion_regex.test(visit.name)
                : true
        )
        .map(visit => visit.name);

    //unscheduled visit set
    this.data.sets.unscheduledVisits = set(
        this.data.sets.visit_col
            .filter(visit =>
                this.settings.visit_exclusion_regex
                    ? this.settings.visit_exclusion_regex.test(visit.name)
                    : false
            )
            .sort((a, b) => a.order - b.order)
            .map(order_visit => {
                const visit = order_visit.name;
                const extra = visit.replace(this.settings.visit_exclusion_regex, '');
                const yesPlease = visit.replace(extra, '');

                return yesPlease;
            })
    )
        .values()
        .sort();
}
