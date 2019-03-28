import recordLevel from './addVariables/recordLevel';
import idLevel from './addVariables/idLevel';

export default function addVariables() {
    recordLevel.call(this);
    idLevel.call(this);
    this.data.variables = Object.keys(this.data.raw[0]);
}
