import mouseover from './highlightTickLabels/mousemove';
import mousemove from './highlightTickLabels/mousemove';
import mouseout from './highlightTickLabels/mouseout';

export default function highlightTickLabels() {
    const context = this;

    this.x_coords = this.x_dom
        .map(value => {
            return {
                value,
                coord: this.x(value),
            };
        });

    this.y_coords = this.y_dom
        .map(value => {
            return {
                value,
                coord: this.y(value),
            };
        });

    this.svg
        .on('mouseover', function() {
            mouseover.call(context, this);
        })
        .on('mousemove', function() {
            mousemove.call(context, this);
        })
        .on('mouseout', function() {
            mouseout.call(context, this);
        });
}
