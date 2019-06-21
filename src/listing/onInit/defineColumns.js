export default function defineColumns() {
    this.config.cols = ['Site', 'ID', 'Status'].concat(this.pvl.data.sets.scheduledVisits);
    this.config.headers = this.config.cols.slice();
}
