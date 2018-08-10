export default function defineColumns() {
    this.listing.config.cols = ['Site/ID'].concat(this.data.sets.visit_col);
}
