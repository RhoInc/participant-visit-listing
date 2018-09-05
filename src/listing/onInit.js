export default function onInit() {
    this.data.raw.forEach(d => {
        this.parent.data.sets.visit_col.forEach(visit => {
            try {
                d[`${visit}_date`] = d3.time
                    .format(this.config.date_format)
                    .parse(d[visit])
                    .getTime()
                    .toString();
            } catch (error) {
                d[`${visit}_date`] = null;
            }
        });
    });
    this.data.initial = this.data.raw.slice();
}
