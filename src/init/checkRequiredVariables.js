import checkFilterCol from './checkRequiredVariables/checkFilterCol';

export default function checkRequiredVariables() {
    this.settings.controlsSynced.inputs
        .filter(input => input.type === 'subsetter')
        .forEach(input => {
            checkFilterCol.call(this, input);
        });
}
