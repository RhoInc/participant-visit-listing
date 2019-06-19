import mouseover from './highlightVisit/mouseover';
import click from './highlightVisit/click';
import clearHighlight from './highlightVisit/click/clearHighlight';
import mouseout from './highlightVisit/mouseout';

export default function highlightVisit() {
    const context = this;

    this.marks.forEach(mark => {
        mark.groups
            .on('mouseover', function(d) {
                mouseover.call(context, this, d);
            })
            .on('click', function(d) {
                if (
                    !context.highlight ||
                    context.highlight.visit !== d.values.raw[0][context.pvl.settings.visit_col]
                )
                    click.call(context, this, d);
                else clearHighlight.call(context);
            })
            .on('mouseout', function(d) {
                mouseout.call(context, this, d);
            });
    });
}
