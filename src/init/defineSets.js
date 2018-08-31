export default function defineSets() {
    [
        'site_col',
        'id_col',
        'id_status_col',
        'visit_col', // with visit_order_col
        'visit_status_col' // with visit_status_order_col and visit_text_color_col
    ].forEach(col => {
        switch (col) {
            case 'visit_col':
                this.data.sets[col] = d3
                    .set(
                        this.data.raw.map(
                            d =>
                                `${d[this.settings.rendererSynced.visit_order_col]}:|:${
                                    d[this.settings.rendererSynced.visit_col]
                                }`
                        )
                    )
                    .values()
                    .sort((a, b) => a.split(':|:')[0] - b.split(':|:')[0])
                    .map(visit => visit.split(':|:')[1]);
                break;
            case 'visit_status_col':
                this.data.sets[col] = d3
                    .set(
                        this.data.raw.map(
                            d =>
                                `${d[this.settings.rendererSynced.visit_status_order_col]}:|:${
                                    d[this.settings.rendererSynced.visit_status_col]}:|:${
                                    d[this.settings.rendererSynced.visit_text_color_col].toLowerCase()
                                }`
                        )
                    )
                    .values()
                    .sort((a,b) => +(a.split(':|:')[0]) - +(b.split(':|:')[0]));
                break;
            default:
                this.data.sets[col] = d3
                    .set(this.data.raw.map(d => d[this.settings.rendererSynced[col]]))
                    .values()
                    .sort();
                break;
        }
    });
}
