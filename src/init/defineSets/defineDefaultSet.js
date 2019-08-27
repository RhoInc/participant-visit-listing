import { set } from 'd3';

export default function defineDefaultSet(dataMapping) {
    let variable = this.settings[dataMapping];

    if (variable !== undefined) {
        this.data.sets[dataMapping] = set(this.data.filtered.map(d => d[variable]))
            .values()
            .sort();

        //Sort set numerically if possible.
        if (this.data.sets[dataMapping].every(value => !isNaN(parseFloat(value.replace(/[^0-9.]/g, '')))))
            this.data.sets[dataMapping].sort(
                (a, b) => parseFloat(a.replace(/[^0-9.]/g, '')) - parseFloat(b.replace(/[^0-9.]/g, ''))
            );
    } else {
        variable = dataMapping;
        this.data.sets[variable] = set(this.data.filtered.map(d => d[variable]))
            .values()
            .sort();

        //Sort set numerically if possible.
        if (this.data.sets[dataMapping].every(value => !isNaN(parseFloat(value.replace(/[^0-9.]/g, '')))))
            this.data.sets[dataMapping].sort(
                (a, b) => parseFloat(a.replace(/[^0-9.]/g, '')) - parseFloat(b.replace(/[^0-9.]/g, ''))
            );
    }

    return this.data.sets[variable];
}
