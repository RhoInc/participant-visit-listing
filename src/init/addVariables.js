export default function addVariables() {
    //Derive record-level variables.
    this.data.raw.forEach(d => {
        d.visitDate = d[this.settings.visit_date_col];
        d.visitCharacter = d[this.settings.visit_col].substring(0, 1);
        d.expected = this.settings.visit_expectation_regex
            ? this.settings.visit_expectation_regex.test(d[this.settings.visit_status_col])
            : false;
        d.unscheduled = this.settings.visit_exclusion_regex
            ? this.settings.visit_exclusion_regex.test(d[this.settings.visit_col])
            : false;
        d.overdue = this.settings.visit_overdue_regex
            ? this.settings.visit_overdue_regex.test(d[this.settings.visit_status_col])
            : false;
    });

    //Derive ID-level variables.
    this.data.ids = d3.nest()
        .key(d => d[this.settings.id_col])
        .rollup(d => {
            const nOverdue = d.filter(di => di.overdue).length;
            d.forEach(di => {
                di.nOverdue = nOverdue;
            });
            return d;
        })
        .map(this.data.raw);
}
