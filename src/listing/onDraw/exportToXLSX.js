import defineXLSX from './exportToXLSX/defineXLSX';
import exportXLSX from './exportToXLSX/exportXLSX';

export default function exportToXLSX() {
    //this.wrap.select('.export#xlsx')
    //    .on('click', () => {
            defineXLSX(this);
            exportXLSX(this);
    //    });
}
