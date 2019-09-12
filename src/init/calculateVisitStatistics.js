import * as d3 from 'd3';

export default function calculateVisitStatistics() {
    this.data.statistics.visits = this.data.sets.visit_col
        .map(visit => visit.name)
        .reduce((visits, visit) => {
            visits[visit] = { name: visit };
            return visits;
        }, {});
    const statistics = ['n', 'min', 'median', 'max', 'mean', 'deviation'];
    Object.keys(this.data.statistics.visits)
        .map(visit => this.data.statistics.visits[visit])
        .forEach(visit => {
            visit.data = this.data.raw.filter(d => d[this.settings.visit_col] === visit.name);
            visit.days = visit.data.map(d => +d[this.settings.visit_day_col]).sort((a, b) => a - b);
            visit.n = visit.days.length;
            statistics
                .filter(statistic => statistic !== 'n')
                .forEach(statistic => {
                    visit[statistic] = d3[statistic](visit.days);
                });
            visit.tooltip = [
                visit.name,
                `Reference day: ${visit.median} (median)`,
                `Statistics:`,
                ...statistics.map(
                    statistic =>
                        ` - ${statistic}: ${
                            ['mean', 'deviation'].includes(statistic)
                                ? d3.format('.1f')(visit[statistic])
                                : Math.round(visit[statistic])
                        }`
                )
            ].join('\n');
            // visit.uniqueDays = d3.nest().key(d => d).rollup(d => d.length).entries(visit.days);
            // visit.mode = visit.uniqueDays.filter(d => d.values === d3.max(visit.uniqueDays, di => di.values));
        });
}
