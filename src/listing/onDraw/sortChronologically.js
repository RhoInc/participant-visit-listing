import onClick from './sortChronologically/onClick';

export default function sortChronologically() {
    const context = this;

    this.thead_cells
        .on('click', function(header) {
            onClick.call(context, this, header);
        });
}
