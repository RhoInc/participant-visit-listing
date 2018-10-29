import onInit from './onInit';
import onLayout from './onLayout';
import onPreprocess from './onPreprocess';
import onDraw from './onDraw';
import onDestroy from './onDestroy';

export default function listing() {
    //Define listing.
    this.listing = new webCharts.createTable(
        this.containers.listing.node(),
        this.settings.rendererSynced,
        this.controls
    );
    this.listing.parent = this;

    //Define callbacks.
    this.listing.on('init', onInit);
    this.listing.on('layout', onLayout);
    this.listing.on('preprocess', onPreprocess);
    this.listing.on('draw', onDraw);
    this.listing.on('destroy', onDestroy);
}
