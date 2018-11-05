export default function onLayout() {
    this.config.sortable = false;
    if (this.pvl.settings.active_tab === 'Charts')
        this.pvl.containers.listing.classed('pvl-hidden', true);
}
