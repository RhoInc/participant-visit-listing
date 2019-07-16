import { select } from 'd3';

export default function loading(event, callback) {
    let t0 = this.performance.now();
    //begin performance test

    //indicate loading
    const html = this.document.getElementsByTagName('html')[0];
    if (!html.classList.contains('pvl-wait')) html.className += ' pvl-wait';
    const body = this.document.body;
    if (!body.classList.contains('pvl-wait')) body.className += ' pvl-wait';
    this.containers.loading.classed('pvl-hidden', false);

    const loading = setInterval(() => {
        const loadingIndicated = this.containers.loading.style('display') !== 'none';

        if (loadingIndicated) {
            //Handle loading indicator.
            clearInterval(loading);
            this.containers.loading.classed('pvl-hidden', true);
            html.className = html.className.replace(' pvl-wait', '');
            body.className = body.className.replace(' pvl-wait', '');

            //Run callback.
            callback();

            //end performance test
            let t1 = this.performance.now();
            if (!this.test) console.log(`${event} took ${t1 - t0} milliseconds.`);
        }
    });
}
