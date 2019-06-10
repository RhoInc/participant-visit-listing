import { time } from 'd3';
import FileSaver from './exportXLSX/FileSaver';
import s2ab from './exportXLSX/s2ab';

export default function exportXLSX() {
    if (!this.pvl.test) {
        try {
            FileSaver(window)(
                new Blob([s2ab(this.XLSX)], { type: 'application/octet-stream' }),
                `participant-visit-listing-${time.format('%Y-%m-%dT%H-%M-%S')(new Date())}.xlsx`
            );
        } catch (error) {
            if (typeof console !== 'undefined') console.log(error);
        }
    }
}
