import checkFilterCols from './transposeData/checkFilterCols';

export default function transposeData() {
    checkFilterCols.call(this, 'subset1');
    checkFilterCols.call(this, 'subset2');
    checkFilterCols.call(this, 'subset3');
    checkFilterCols.call(this, 'overdue2');

    this.data.sets.id_col.forEach(id => {
        const id_data = this.data.raw.filter(d => d[this.settings.rendererSynced.id_col] === id);
        const datum = {};
        datum[this.settings.rendererSynced.site_col] =
            id_data[0][this.settings.rendererSynced.site_col];
        datum['Site'] = datum[this.settings.rendererSynced.site_col];
        datum[this.settings.rendererSynced.id_col] = id;
        datum['ID'] = datum[this.settings.rendererSynced.id_col];
        datum[this.settings.rendererSynced.id_status_col] =
            id_data[0][this.settings.rendererSynced.id_status_col];
        datum['Status'] = datum[this.settings.rendererSynced.id_status_col];

        if (this.data.missingVariables.overdue2) datum['overdue2'] = id_data[0]['overdue2'];

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

            if (this.data.missingVariables.subset1) datum['subset1'] = id_data[0]['subset1'];
            if (this.data.missingVariables.subset2) datum['subset2'] = id_data[0]['subset2'];
            if (this.data.missingVariables.subset3) datum['subset3'] = id_data[0]['subset3'];
        });
        this.data.transposed.push(datum);
    });
}
