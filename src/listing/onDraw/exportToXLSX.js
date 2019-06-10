import defineXLSX from './exportToXLSX/defineXLSX';
import exportXLSX from './exportToXLSX/exportXLSX';

export default function exportToXLSX() {
    if (this.config.exportable)
        this.wrap.select('.export#xlsx').on('click', () => {
            defineXLSX.call(this);
            exportXLSX.call(this);
        });
}
