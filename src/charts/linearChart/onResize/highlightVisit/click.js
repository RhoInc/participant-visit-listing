import clearHighlight from './click/clearHighlight';
import deemphasizeMarks from './click/deemphasizeMarks';
import { median } from 'd3';
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
    }

    //Reduce opacity of all circles.
    deemphasizeMarks.call(this);

    //Select points representing selected visit value.
    this.highlight.points = this.svg
        .selectAll('.point')
        .filter(di => di.values.raw[0][this.pvl.settings.visit_col] === this.highlight.visit)
        .classed('pvl-highlighted-visit', true);

    //Append a reference line of the median study day of the selected visit.
    this.highlight.data = this.pvl.data.raw.filter(
        d => d[this.pvl.settings.visit_col] === this.highlight.visit
    );
    this.highlight.referenceDay = Math.round(
        median(this.highlight.data, d => +d[this.pvl.settings.visit_day_col])
    );

    //Add reference line.
    addReferenceLine.call(this);

    //Add reference text annotation.
    addReferenceText.call(this);

    //Highlight points representing selected visit value.
    addHighlightLines.call(this);
}
