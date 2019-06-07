export default function loading(event, callback) {
    let t0 = this.performance.now();
    //begin performance test

    //indicate loading
    d3.select('html').classed('pvl-wait', true);
    d3.select('body').classed('pvl-wait', true);
    this.containers.loading.classed('pvl-hidden', false);

    const loading = setInterval(() => {
        const loadingIndicated = this.containers.loading.style('display') !== 'none';

        if (loadingIndicated) {
            //Handle loading indicator.
            clearInterval(loading);
            this.containers.loading.classed('pvl-hidden', true);

            //Run callback.
            callback();
            d3.select('html').classed('pvl-wait', false);
            d3.select('body').classed('pvl-wait', false);

            //end performance test
            let t1 = this.performance.now();
            console.log(`${event} took ${t1 - t0} milliseconds.`);
        }
    });
}
