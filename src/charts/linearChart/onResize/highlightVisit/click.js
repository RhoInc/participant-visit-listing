import clearHighlight from './click/clearHighlight';
import { format } from 'd3';
import deemphasizeMarks from './click/deemphasizeMarks';
import addReferenceLine from './click/addReferenceLine';
import addReferenceText from './click/addReferenceText';
import addHighlightLines from './click/addHighlightLines';

export default function click(element, d) {
    clearHighlight.call(this, !!d);

    //Capture selected visit value.
    if (d) {
        this.highlight = {
            visit: d.values.raw[0][this.pvl.settings.visit_col],
            container: this.svg
                .insert('g', '.mark1')
                .classed('pvl-highlighted-visit-container', true)
                .on('click', () => clearHighlight.call(this))
        };
        this.highlight.statistics = this.pvl.data.statistics.visits[this.highlight.visit];
        this.highlight.referenceDay = Math.round(this.highlight.statistics.median);
        const statistics = ['n', 'min', 'median', 'max', 'mean', 'deviation'];
        this.highlight.tooltip = [
            this.highlight.visit,
            `Reference day: ${this.highlight.referenceDay} (median)`,
            `Statistics:`,
            ...statistics.map(
                statistic =>
                    ` - ${statistic}: ${
                        ['mean', 'deviation'].includes(statistic)
                            ? format('.1f')(this.highlight.statistics[statistic])
                            : Math.round(this.highlight.statistics[statistic])
                    }`
            ),
            'Click to remove highlighting.'
        ].join('\n');
    }

    //Reduce opacity of all circles.
    deemphasizeMarks.call(this);

    //Select points representing selected visit value.
    this.highlight.points = this.svg
        .selectAll('.point')
        .filter(di => di.values.raw[0][this.pvl.settings.visit_col] === this.highlight.visit)
        .classed('pvl-highlighted-visit', true);

    //Add a reference line of the median study day of the selected visit.
    addReferenceLine.call(this);

    //Add reference text annotation.
    addReferenceText.call(this);

    //Highlight points representing selected visit value.
    addHighlightLines.call(this);
}
