import { set } from 'd3';

export default function defineLegendSet() {
    this.data.sets.legend = set(
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
    this.data.sets.past_visits = this.data.sets.legend
        .map(visit_status => visit_status.split(':|:')[1])
        .filter(visit_status => !this.settings.visit_expectation_regex.test(visit_status));
    this.data.sets.future_visits = this.data.sets.legend
        .map(visit_status => visit_status.split(':|:')[1])
        .filter(visit_status => this.settings.visit_expectation_regex.test(visit_status));
}
