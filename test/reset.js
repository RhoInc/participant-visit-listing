import jsdom from 'jsdom';
import { performance } from 'perf_hooks';
import participantVisitListing from '../src/index.js';
import expect from 'expect';
import d3 from 'd3';
const data = require('./visits.json');

describe('The reset method is called.', () => {
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

    it('set the value of each filter object to "All"', () => {
        const loading = setInterval(() => {
            const loadingIndicated = instance.hasOwnProperty('data');

            if (loadingIndicated) {
                //Handle loading indicator.
                clearInterval(loading);
                //setTimeout(
                //    () => {
                        console.log('before querySelectorAll');
                        const options = instance.containers.main
                            .selectAll('option')
                            .filter(d => d !== 'All');
                        console.log('after querySelectorAll');
                        console.log(`n options: ${options.size()}`);
                        //const sample = [];
                        //for (let i = 0; i < 1000; i++) {
                            const index = Math.floor(Math.random()*options.size());
                            console.log(index);
                        //    sample.push(index);
                        //}
                        //console.table(
                        //    d3.nest()
                        //        .key(d => d)
                        //        .rollup(d => d.length)
                        //        .entries(sample)
                        //);
                        const option = options.filter((d,i) => i === index);
                        //console.log(option.node());
                        console.log(option.datum());
                        //option.node().click();
                        const select = option.node().parentNode;
                        //console.log(select);
                        //console.log(d3.select(select).datum());
                        select.value = option.datum();
                        console.log(instance.data.filters.map(filter => filter.value));
                        select.dispatchEvent(new dom.window.Event('change', {bubbles: true}));
                        console.log(instance.data.filters.map(filter => filter.value));
                //    },
                //    1000
                //);
                expect(instance.data.filters.every(filter => filter.value === 'All')).toBe(false);
            }
        });
    });
});
