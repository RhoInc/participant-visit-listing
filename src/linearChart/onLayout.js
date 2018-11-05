export default function onLayout() {
    this.topXAxisG = this.svg.append('g').classed('x x--top axis linear', true);
    this.topXAxisG.append('text').classed('axis-title axis-title--top', true);

    if (this.pvl.settings.active_tab === 'Listing')
        this.pvl.containers.charts.classed('pvl-hidden', true);
}
