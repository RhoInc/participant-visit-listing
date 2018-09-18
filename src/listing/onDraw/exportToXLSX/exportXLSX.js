import { saveAs } from './exportXLSX/FileSaver';
import s2ab from './exportXLSX/s2ab';

export default function exportXLSX(listing) {
    try {
        saveAs(
            new Blob(
                [s2ab(listing.XLSX)],
                {type:'application/octet-stream'}
            ),
            'participant-visit-listing.xlsx'
        );
    } catch(error) {
        if (typeof console !== 'undefined')
            console.log(error);
    }
}
