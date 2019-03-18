export default function split() {
    const t0 = performance.now();
    //begin performance test

    //indicate loading
    this.pvl.containers.loading.classed('pvl-hidden', false);

    const loading = setInterval(() => {
        const loadingIndicated = this.pvl.containers.loading.style('display') !== 'none';

        if (loadingIndicated) {
            //Handle loading indicator.
            clearInterval(loading);
            this.pvl.containers.loading.classed('pvl-hidden', true);

            this.pvl.containers.ordinalChart.classed('pvl-hidden', false).style('width', '49.5%');
            this.pvl.ordinalChart.draw();
            this.pvl.containers.linearChart.classed('pvl-hidden', false).style('width', '49.5%');
            this.pvl.linearChart.draw();
        }
    });

    //end performance test
    const t1 = performance.now();
    console.log(`split() took ${t1 - t0} milliseconds.`);
}
