import jsdom from 'jsdom';
import { performance } from 'perf_hooks';
import participantVisitListing from '../src/index.js';
import expect from 'expect';
import d3 from 'd3';
const data = require('./visits.json');

describe('the clicking of the reset button', function() {
    this.timeout(5000);
    const { JSDOM } = jsdom;
    global.window = new JSDOM(``, { runScripts: 'dangerously' }).window;
    let dom, container, instance;

    before(() => {
        dom = new JSDOM('<!doctype html>');
        container = dom.window.document.createElement('div');
        instance = participantVisitListing(container, { exportable: false }, { dom, performance });
        instance.init(data, true);
    });

    after(() => {});

    beforeEach(() => {
        const loading = setInterval(() => {
            const loadingIndicated = instance.hasOwnProperty('data');

            if (loadingIndicated) {
                // Handle loading indicator.
                clearInterval(loading);

                // Capture all non-All options in the DOM.
                const options = instance.containers.main
                    .selectAll('option')
                    .filter(d => d !== 'All');

                // Select a random value between 0 and the number of non-All options.
                const index = Math.floor(Math.random() * options.size());

                // Select the index-th option.
                const option = options.filter((d, i) => i === index);

                // Select the index-th option's parent element.
                const select = option.node().parentNode;

                // Set the parent element's value to the option's datum.
                select.value = option.datum();

                // Dispatch a change event on the parent element.
                select.dispatchEvent(new dom.window.Event('change', { bubbles: true }));
            }
        });
    });

    afterEach(() => {});

    it('the filters are reset when the reset button is clicked', () => {
        const resetting = setInterval(() => {
            const resetDisabled = instance.controls.reset.button.property('disabled');

            if (!resetDisabled) {
                // Handle loading indicator.
                clearInterval(resetting);

                // Dispatch a change event on the parent element.
                instance.controls.reset.button
                    .node()
                    .dispatchEvent(new dom.window.Event('click', { bubbles: true }));

                // Wait for the gears to turn, then check the filters.
                // FIXME: figure out a better way to wait for the renderer to update than waiting an arbitrary amount of time.
                setTimeout(() => {
                    const filtersChanged = instance.data.filters.every(
                        filter =>
                            filter.value === 'All' ||
                            (Array.isArray(filter.value) &&
                                filter.value.join('') === filter.set.join(''))
                    );
                    expect(filtersChanged).toBe(true);
                }, 1000);
            }
        });
    });
});
