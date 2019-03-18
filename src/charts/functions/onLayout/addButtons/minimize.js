export default function minimize() {
    const t0 = performance.now();
    //begin performance test

    //indicate loading
    this.pvl.containers.loading.classed('pvl-hidden', false);

    const loading = setInterval(() => {
        const loadingIndicated =
            this.pvl.containers.loading.style('display') !==
            'none';

        if (loadingIndicated) {
            //Handle loading indicator.
            clearInterval(loading);
            this.pvl.containers.loading.classed(
                'pvl-hidden',
                true
            );

            const thisChart = this.property;
            const thatChart = this.property === 'linearChart' ? 'ordinalChart' : 'linearChart';
            this.pvl.containers[thisChart].classed('pvl-hidden', true);
            this.pvl.containers[thatChart].classed('pvl-hidden', false).style('width', '100%');
            this.pvl[thatChart].draw();
        }
    });

    //end performance test
    const t1 = performance.now();
    console.log(`minimize() took ${t1 - t0} milliseconds.`);
}
