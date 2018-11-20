export default function hideListing() {
    if (this.pvl.settings.active_tab !== 'Listing')
        this.pvl.containers.listing.classed('pvl-hidden', true);
}
