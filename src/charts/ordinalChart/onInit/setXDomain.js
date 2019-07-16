export default function setXDomain() {
    this.config.x.domain = this.pvl.data.sets.scheduledVisits;
    this.config.marks.forEach(mark => {
        mark.values[this.pvl.settings.visit_col] = this.pvl.data.sets.scheduledVisits;
    });
}
