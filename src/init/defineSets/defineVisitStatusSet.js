import { set } from 'd3';

export default function defineVisitStatusSet() {
    this.data.sets.visit_status_col = set(
        this.data.raw.map(
            d =>
                `${d[this.settings.visit_status_order_col]}:|:${
                    d[this.settings.visit_status_col]
                }:|:${d[this.settings.visit_status_color_col].toLowerCase()}:|:${
                    d[this.settings.visit_status_description_col]
                }`
        )
    )
        .values()
        .sort((a, b) => +a.split(':|:')[0] - +b.split(':|:')[0]);

    //Update ordinal chart settings.
    this.ordinalChart.config.color_dom = this.data.sets.visit_status_col.map(
        visit_status => visit_status.split(':|:')[1]
    );
    this.ordinalChart.config.colors = this.data.sets.visit_status_col.map(
        visit_status => visit_status.split(':|:')[2]
    );
    this.ordinalChart.config.legend.order = this.data.sets.visit_status_col.map(
        visit_status => visit_status.split(':|:')[1]
    );

    //Update linear chart settings.
    this.linearChart.config.color_dom = this.data.sets.visit_status_col.map(
        visit_status => visit_status.split(':|:')[1]
    );
    this.linearChart.config.colors = this.data.sets.visit_status_col.map(
        visit_status => visit_status.split(':|:')[2]
    );
    this.linearChart.config.legend.order = this.data.sets.visit_status_col.map(
        visit_status => visit_status.split(':|:')[1]
    );
}
