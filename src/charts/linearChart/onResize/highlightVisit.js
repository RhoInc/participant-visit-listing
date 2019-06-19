import mouseover from './highlightVisit/mouseover';
import click from './highlightVisit/click';
import mouseout from './highlightVisit/mouseout';

export default function highlightVisit() {
    const context = this;

    this.marks.forEach(mark => {
        mark.groups
            .on('mouseover', function(d) {
                mouseover.call(context, this, d);
            })
            .on('click', function(d) {
                click.call(context, this, d);
            })
            .on('mouseout', function(d) {
                mouseout.call(context, this, d);
            });
    });
}
