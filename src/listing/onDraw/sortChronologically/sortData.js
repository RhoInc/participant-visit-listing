export default function sortData(data) {
    this.data.raw = this.data.raw.sort((a, b) => {
        let order = 0;

        this.sortable.order.forEach(item => {
            const aCell = a[`${item.col}_date`]
                ? a[`${item.col}_date`]
                : a[item.col];
            console.log(aCell);
            console.log(typeof aCell);
            const bCell = b[`${item.col}_date`]
                ? b[`${item.col}_date`]
                : b[item.col];
            console.log(bCell);

            if (order === 0) {
                if (aCell !== null && bCell !== null) {
                    if (
                        (item.direction === 'ascending' && aCell < bCell) ||
                        (item.direction === 'descending' && aCell > bCell)
                    )
                        order = -1;
                    else if (
                        (item.direction === 'ascending' && aCell > bCell) ||
                        (item.direction === 'descending' && aCell < bCell)
                    )
                        order = 1;
                }
                else if (aCell === null)
                    order = 2;
                else if (bCell === null)
                    order = -2;
            }
        });

        return order;
    });
}
