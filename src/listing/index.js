import { createTable } from 'webcharts';
import onInit from './onInit';
import onLayout from './onLayout';
import onPreprocess from './onPreprocess';
import onDraw from './onDraw';
import onDestroy from './onDestroy';

export default function listing() {
    // Define listing (Listing).
    this.listing = new createTable(
        this.containers.listing.node(),
        this.settings.listingSynced,
        this.controls
    );
    this.listing.pvl = this;

    // Define callbacks.
    this.listing.on('init', onInit);
    this.listing.on('layout', onLayout);
    this.listing.on('preprocess', onPreprocess);
    this.listing.on('draw', onDraw);
    this.listing.on('destroy', onDestroy);

    // Attach display to central object ([ pvl ]).
    this.displays.push(
        {
            name: 'listing',
            title: 'Listing',
            module: this.listing,
            tabs: ['Listing'],
            active: ['Listing'].includes(this.settings.active_tab),
        }
    );
}
