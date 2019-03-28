export default function recordLevel() {
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
}
