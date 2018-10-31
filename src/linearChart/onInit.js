export default function onInit() {
    this.raw_data
        .forEach(d => {
            d.visitDate = d[this.pvl.settings.visit_date_col];
        });
}
