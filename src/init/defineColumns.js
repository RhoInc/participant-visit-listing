export default function defineColumns() {
    this.listing.config.cols = ['Site', 'ID', 'Status'].concat(this.data.sets.visit_col);
}
