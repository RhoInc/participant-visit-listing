export default function transposeData() {
    this.data.transposed = new Array(this.data.sets.id_col.length);

    let i = 0;
    for (const id of this.data.sets.id_col) {
        const id_data = this.data.raw.filter(d => d[this.settings.id_col] === id);
        const datum = {
            [this.settings.site_col]: id_data[0][this.settings.site_col],
            Site: id_data[0][this.settings.site_col],
            [this.settings.id_col]: id,
            ID: id,
            [this.settings.id_status_col]: id_data[0][this.settings.id_status_col],
            Status: id_data[0][this.settings.id_status_col],
            nOverdue: id_data[0].nOverdue
        };

        for (const visit of this.data.sets.visit_col) {
            const visit_datum = id_data.find(d => d[this.settings.visit_col] === visit.name);
            datum[visit.name] = visit_datum ? visit_datum[this.settings.visit_text_col] : '';
            datum[`${visit.name}-date`] = visit_datum
                ? visit_datum[this.settings.visit_date_col]
                : '';
            datum[`${visit.name}-status`] = visit_datum
                ? visit_datum[this.settings.visit_status_col]
                : '';
            datum[`${visit.name}-color`] = visit_datum
                ? visit_datum[this.settings.visit_status_color_col]
                : '';

            if (this.data.missingVariables.subset1) datum['subset1'] = id_data[0]['subset1'];
            if (this.data.missingVariables.subset2) datum['subset2'] = id_data[0]['subset2'];
            if (this.data.missingVariables.subset3) datum['subset3'] = id_data[0]['subset3'];
        }
        this.data.transposed[i] = datum;
        i += 1;
    }
}
