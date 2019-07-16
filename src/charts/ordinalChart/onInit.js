import setXDomain from './onInit/setXDomain';

export default function onInit() {
    this.initialized = true;
    this.property = 'ordinalChart';
    setXDomain.call(this);
}
