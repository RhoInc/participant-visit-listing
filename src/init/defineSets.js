export default function defineSets() {
    [
        'site_col',
        'id_col',
        'id_status_col',
        'visit_col',
        'visit_status_col',
        'visit_color_col'
    ].forEach(col => {
        if (col !== 'visit_col')
            this.data.sets[col] = d3
                .set(this.data.raw.map(d => d[this.settings.rendererSynced[col]]))
                .values()
                .sort();
        else
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
    });
}
