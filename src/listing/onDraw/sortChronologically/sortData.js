export default function sortData(data) {
    this.data.raw = this.data.raw.sort((a, b) => {
        let order = 0;

        this.sortable.order.forEach(item => {
            const aCell = a[`${item.col}-date`] ? a[`${item.col}-date`] : a[item.col];
            const bCell = b[`${item.col}-date`] ? b[`${item.col}-date`] : b[item.col];

            if (order === 0) {
                if (aCell !== null && bCell !== null) {
                    if (
                        (item.direction === 'ascending' && aCell < bCell) ||
                        (item.direction === 'descending' && aCell > bCell)
                    ) {
                        order = -1;
                    } else if (
                        (item.direction === 'ascending' && aCell > bCell) ||
                        (item.direction === 'descending' && aCell < bCell)
                    ) {
                        order = 1;
                    }
                } else if (['', null].indexOf(aCell) > -1) {
                    order = 2;
                } else if (['', null].indexOf(bCell) > -1) {
                    order = -2;
                }
            }
        });

        return order;
    });
}
