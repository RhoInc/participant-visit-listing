export default function addVariables() {
    this.data.raw.forEach(d => {
        d.visitDate = d[this.settings.visit_date_col];
        d.visitCharacter = d[this.settings.visit_col].substring(0, 1);
        d.expected = this.settings.visit_expectation_regex.test(d[this.settings.visit_status_col]);
        d.unscheduled = this.settings.visit_exclusion_regex.test(d[this.settings.visit_col]);
    });
}
