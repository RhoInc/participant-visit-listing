import { median } from 'd3';
import deemphasizeMarks from './click/deemphasizeMarks';
import clearHighlight from './click/clearHighlight';
import addReferenceText from './click/addReferenceText';
import addReferenceLine from './click/addReferenceLine';
import addHighlightLines from './click/addHighlightLines';

export default function click(element, d) {
    clearHighlight.call(this);

    //Select all points.
    this.points = this.svg
        .selectAll('.point')
        .filter(d => d.mark.id === 'mark1')
        .classed('pvl-highlighted-visit', false);

    //Reduce opacity of all circles.
    deemphasizeMarks.call(this);

    //Capture selected visit value.
    this.highlight = {
        visit: d.values.raw[0][this.pvl.settings.visit_col],
        container: this.svg
            .insert('g', '.mark1')
            .classed('pvl-highlighted-visit-container', true)
            .on('click', () => clearHighlight.call(this))
    };

    //Select points representing selected visit value.
    this.highlight.points = this.points
        .filter(di => di.values.raw[0][this.pvl.settings.visit_col] === this.highlight.visit)
        .classed('pvl-highlighted-visit', true);

    //Append a reference line of the median study day of the selected visit.
    this.highlight.data = this.highlight.points
        .data()
        .sort((a, b) =>
            a.values.y < b.values.y ? -1 : b.values.y < a.values.y ? 1 : a.total - b.total
        );
    this.highlight.referenceDay = Math.round(median(this.highlight.data, d => d.total));

    //Add reference line.
    addReferenceLine.call(this);

    //Add reference text annotation.
    addReferenceText.call(this);

    //Highlight points representing selected visit value.
    addHighlightLines.call(this);
}
