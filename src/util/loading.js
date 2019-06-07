export default function loading(event, callback) {
    let t0 = this.performance.now();
    //begin performance test

        //indicate loading
        this.containers.loading.classed('pvl-hidden', false);

        const loading = setInterval(() => {
            const loadingIndicated = this.containers.loading.style('display') !== 'none';

            if (loadingIndicated) {
                //Handle loading indicator.
                clearInterval(loading);
                this.containers.loading.classed('pvl-hidden', true);

                //Run callback.
                callback();
            }
        });

    //end performance test
    let t1 = this.performance.now();
    console.log(`${event} took ${t1 - t0} milliseconds.`);
}
