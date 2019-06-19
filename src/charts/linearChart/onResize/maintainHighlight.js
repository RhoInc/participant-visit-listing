import click from './highlightVisit/click';

export default function maintainHighlight() {
    if (this.highlight)
        click.call(this);
}
