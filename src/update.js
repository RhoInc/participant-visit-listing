export default function update() {
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => /^Analysis Subset \d$/.test(d.label))
        .selectAll('select')
        .on('change', function(d) {
            const select = d3.select(this);
        });
}
