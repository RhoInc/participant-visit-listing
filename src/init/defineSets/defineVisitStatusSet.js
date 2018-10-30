export default function defineVisitStatusSet() {
    this.data.sets.visit_status_col = d3
        .set(
            this.data.raw.map(
                d =>
                    `${d[this.settings.visit_status_order_col]}:|:${
                        d[this.settings.visit_status_col]
                    }:|:${d[this.settings.visit_text_color_col].toLowerCase()}:|:${
                        d[this.settings.visit_status_description_col]
                    }`
            )
        )
        .values()
        .sort((a, b) => +a.split(':|:')[0] - +b.split(':|:')[0]);
    this.chart.config.color_dom = this.data.sets.visit_status_col
        .map(visit_status => visit_status.split(':|:')[1]);
    this.chart.config.colors = this.data.sets.visit_status_col
        .map(visit_status => visit_status.split(':|:')[2]);
    this.chart.config.legend.order = this.data.sets.visit_status_col
        .map(visit_status => visit_status.split(':|:')[1]);
}
