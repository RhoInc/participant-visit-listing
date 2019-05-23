import defineXLSX from './exportToXLSX/defineXLSX';
import exportXLSX from './exportToXLSX/exportXLSX';

export default function exportToXLSX() {
    console.log(this.config.exportable);
    if (this.config.exportable)
        this.wrap.select('.export#xlsx').on('click', () => {
            defineXLSX(this);
            exportXLSX(this);
        });
}
