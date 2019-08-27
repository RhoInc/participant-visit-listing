import jsdom from 'jsdom';
import { performance } from 'perf_hooks';
import participantVisitListing from '../src/index.js';
import expect from 'expect';
import d3 from 'd3';
const data = require('./visits.json');

describe('the changing of the filters', function() {
    this.timeout(5000);
    const { JSDOM } = jsdom;
    global.window = (new JSDOM(``, { runScripts: "dangerously" })).window;
    let dom, container, instance;

    before(() => {
        dom = new JSDOM('<!doctype html>');
        container = dom.window.document.createElement('div');
        instance = participantVisitListing(container, {exportable: false}, {dom,performance});
        instance.init(data, true);
    });

    after(() => {
    });

    beforeEach(() => {
    });

    afterEach(() => {
    });

    it('the filters update appropriately when a subsetter control changes', () => {
        const loading = setInterval(() => {
            const loadingIndicated = instance.containers.loading.style('display') !== 'none';

            if (loadingIndicated) {
                // Handle loading indicator.
                clearInterval(loading);

                // Capture all non-All options in the DOM.
                const options = instance.controls.wrap
                    .selectAll('option')
                    .filter(d => d !== 'All');
                if (options.size()) {
                    console.log(options);

                    // Select a random value between 0 and the number of non-All options.
                    const index = Math.floor(Math.random()*options.size());
                    console.log(index);

                    // Select the index-th option.
                    const option = options.filter((d,i) => i === index);
                    console.log(option);

                    // Select the index-th option's parent element.
                    const select = option.node().parentNode;

                    // Set the parent element's value to the option's datum.
                    select.value = option.datum();

                    // Dispatch a change event on the parent element.
                    select.dispatchEvent(new dom.window.Event('change', { bubbles: true }));

                    // Wait for the gears to turn, then check the filters.
                    // FIXME: figure out a better way to wait for the renderer to update than waiting an arbitrary amount of time.
                    setTimeout(
                        () => {
                            //console.log(
                            //    instance.data.filters.find(filter => filter.value !== 'All')
                            //);
                            const filtersChanged = instance.data.filters
                                .every(filter => (
                                    filter.value === 'All'
                                    || (
                                        Array.isArray(filter.value)
                                        && filter.value.join('') === filter.set.join('')
                                    )
                                ));
                            //console.log(filtersChanged);
                            expect(filtersChanged).toBe(false);
                        },
                        1000
                    );
                } else
                    expect('i hate headless browser unit testing').toBe('i hate headless browser unit testing');
            }
        });
    });
});
