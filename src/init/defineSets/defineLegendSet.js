export default function defineLegendSet() {
    this.data.sets.legend = d3
        .set(
            this.data.raw
                .filter(
                    d =>
                        d[this.settings.visit_status_exclusion_col] !==
                        this.settings.visit_status_exclusion_value
                )
                .map(
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
}
