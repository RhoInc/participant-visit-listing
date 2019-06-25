export default function defineColumns() {
    this.config.cols = this.display_dates
        ? ['Site', 'ID', 'Status'].concat(
              this.pvl.data.sets.scheduledVisits.map(visit => `${visit}-date`)
          )
        : ['Site', 'ID', 'Status'].concat(this.pvl.data.sets.scheduledVisits);
    this.config.headers = this.config.cols.slice().map(col => col.replace('-date', ''));
}
