export default function transposeData() {
    this.data.sets.id_col.forEach(id => {
        const id_data = this.data.raw.filter(d => d[this.settings.rendererSynced.id_col] === id);
        const datum = {};
        datum[this.settings.rendererSynced.id_col] = id;
        datum[this.settings.rendererSynced.site_col] =
            id_data[0][this.settings.rendererSynced.site_col];
        datum[this.settings.rendererSynced.id_status_col] =
            id_data[0][this.settings.rendererSynced.id_status_col];
        datum['Site/ID'] = `${datum[this.settings.rendererSynced.site_col]}/${
            datum[this.settings.rendererSynced.id_col]
        }`;
        this.data.sets.visit_col.forEach(visit => {
            const visit_datum = id_data.find(
                d => d[this.settings.rendererSynced.visit_col] === visit
            );
            datum[visit] = visit_datum
                ? visit_datum[this.settings.rendererSynced.visit_text_col]
                : null;
            datum[`${visit}-status`] = visit_datum
                ? visit_datum[this.settings.rendererSynced.visit_status_col]
                : null;
            datum[`${visit}-color`] = visit_datum
                ? visit_datum[this.settings.rendererSynced.visit_text_color_col]
                : null;
        });
        this.data.transposed.push(datum);
    });
}
