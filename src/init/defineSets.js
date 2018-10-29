import defineVisitSet from './defineSets/defineVisitSet';
import defineVisitStatusSet from './defineSets/defineVisitStatusSet';
import defineLegendSet from './defineSets/defineLegendSet';
import defineDefaultSet from './defineSets/defineDefaultSet';

export default function defineSets() {
    [
        'site_col',
        'id_col',
        'id_status_col',
        'visit_col', // with visit_order_col
        'visit_status_col' // with visit_status_order_col, visit_text_color_col, and visit_status_description_col
    ].forEach(col => {
        switch (col) {
            case 'visit_col':
                defineVisitSet.call(this);
                break;
            case 'visit_status_col':
                defineVisitStatusSet.call(this);
                defineLegendSet.call(this);
                break;
            default:
                defineDefaultSet.call(this, col);
                break;
        }
    });
}
