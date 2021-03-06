import jsdom from 'jsdom';
import { performance } from 'perf_hooks';
import participantVisitListing from '../src/index.js';
import expect from 'expect';
import d3 from 'd3';
const data = require('./visits.json');

describe('The init method is called.', () => {
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

    beforeEach(() => {});

    afterEach(() => {});

    it('should attach data to the participantVisitListing object', () => {
        const loading = setInterval(() => {
            const loadingIndicated = instance.hasOwnProperty('data');

            if (loadingIndicated) {
                // Handle loading indicator.
                clearInterval(loading);
                expect(instance.data.raw.length).toEqual(data.length);
            }
        });
    });
});
