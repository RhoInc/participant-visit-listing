import checkFilterCol from './checkRequiredVariables/checkFilterCol';

export default function checkRequiredVariables() {
    this.settings.filter_cols.forEach(filter_col => {
        checkFilterCol.call(this, filter_col);
    });
}
