export default function abbreviateXAxisTickLabels() {
    if (this.pvl.settings.abbreviate_visits)
        this.wrap.selectAll('.x.axis .tick text').text(d => {
            const abbreviation = this.pvl.data.sets.visit_col.find(visit => visit.name === d)
                .abbreviation;
            return abbreviation !== 'undefined'
                ? this.pvl.data.sets.visit_col.find(visit => visit.name === d).abbreviation
                : d;
        });
}
