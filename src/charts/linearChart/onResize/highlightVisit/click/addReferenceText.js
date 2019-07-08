export default function addReferenceText() {
    this.highlight.referenceText = this.highlight.container
        .append('text')
        .classed('pvl-highlighted-visit-mark pvl-highlighted-visit-mark--reference-text', true)
        .attr({
            x: this.x(this.highlight.referenceDay),
            dx: this.highlight.referenceDay <= (this.x_dom[1] - this.x_dom[0]) / 2 ? 5 : -5,
            y: 0,
            dy: 5,
            'font-size': '12px',
            'text-anchor':
                this.highlight.referenceDay <= (this.x_dom[1] - this.x_dom[0]) / 2
                    ? 'beginning'
                    : 'end'
        })
        .style('font-weight', 'bold')
        .text(`${this.highlight.visit} (Day ${this.highlight.referenceDay})`);
    this.highlight.referenceText.append('title').text(this.highlight.tooltip);
}
