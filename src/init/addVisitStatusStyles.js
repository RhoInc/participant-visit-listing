export default function addVisitStatusStyles() {
    const visitStatusStyles = this.data.sets.visit_status_col
        .map(visit_status => {
            const split = visit_status.split(':|:');
            const order = split[0];
            const status = split[1].toLowerCase().replace(/[^_a-z-]/g, '-'); // .replace(/ /g, '.');
            const color = split[2];
            const styles = [
                `.pvl-visit-status--${status} {`,
                `    border-top: 2px solid ${color};`,
                `    border-bottom: 2px solid ${color};`,
                `}`,
                `.pvl-visit-status--heat-map.pvl-visit-status--${status} {`,
                `    background: ${color};`,
                `    color: transparent;`,
                `    opacity: .9;`,
                `}`,
                `.pvl-visit-status--cell-text.pvl-visit-status--${status} {`,
                `    color: ${color};`,
                `    opacity: 1;`,
                `}`,
                `tr:nth-child(odd) .pvl-visit-status--cell-text.pvl-visit-status--${status} {`,
                `    background: white;`,
                `}`,
                `tr:nth-child(even) .pvl-visit-status--cell-text.pvl-visit-status--${status} {`,
                `    background: #eee;`,
                `}`
            ];
            return styles.join('\n');
        })
        .join('\n');
    this.containers.style.html(`${this.containers.style.html()}\n${visitStatusStyles}`);
}
