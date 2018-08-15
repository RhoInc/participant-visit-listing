export default function transposeData() {
    this.data.sets.id_col.forEach(id => {
        const id_data = this.data.raw
            .filter(d => d[this.settings.rendererSynced.id_col] === id);
        const datum = {
            id,
            site: id_data[0][this.settings.rendererSynced.site_col],
            id_status: id_data[0][this.settings.rendererSynced.id_status_col]
        };
        datum['Site/ID'] = `${datum.site}/${datum.id}`;
        this.data.sets.visit_col.forEach(visit => {
            const visit_datum = id_data.find(
                d => d[this.settings.rendererSynced.visit_col] === visit
            );
            datum[visit] = visit_datum
                ? visit_datum[this.settings.rendererSynced.visit_status_col]
                : null;
            datum[`${visit}-color`] = visit_datum
                ? visit_datum[this.settings.rendererSynced.visit_color_col]
                : null;
        });
        this.data.transposed.push(datum);
    });
}
