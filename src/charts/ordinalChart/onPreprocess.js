import setXDomain from './onPreprocess/setXDomain';
import setYDomain from '../functions/onPreprocess/setYDomain';

export default function onPreprocess() {
    setXDomain.call(this);
    setYDomain.call(this);
}
