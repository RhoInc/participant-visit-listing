import jsdom from 'jsdom';
import { performance } from 'perf_hooks';
import participantVisitListing from '../src/index.js';
import filterData from '../src/init/update/filterData';
import defineVisitSet from '../src/init/defineSets/defineVisitSet';
import expect from 'expect';
import d3 from 'd3';
const data = require('./visits.json');
import util from 'util';

describe('An analysis subset is in place.', () => {
    const { JSDOM } = jsdom;
    global.window = new JSDOM(``, { runScripts: 'dangerously' }).window;
    let dom, container, instance;

    before(() => {
        dom = new JSDOM('<!doctype html>');
        container = dom.window.document.createElement('div');
    });

    after(() => {});

    beforeEach(() => {
        instance = participantVisitListing(container, { exportable: false }, { dom, performance });
        instance.init(data, true);
    });

    afterEach(() => {
        instance.destroy();
    });

    it('should define a subset of fewer visits than in the full set of scheduled visits', () => {
        const loading = setInterval(() => {
            const loadingIndicated = instance.loaded;

            if (loadingIndicated) {
                // Handle loading indicator.
                clearInterval(loading);
                const scheduledVisits = d3
                    .set(
                        data
                            .map(d => d[instance.settings.visit_col])
                            .filter(visit => !instance.settings.visit_exclusion_regex.test(visit))
                    )
                    .values();
                instance.data.filters.find(filter => filter.col === 'subset2').value =
                    'On Treatment';
                filterData.call(instance);
                defineVisitSet.call(instance);
                const analysisVisits = instance.data.sets.scheduledVisits;
                expect(scheduledVisits.length).toBeGreaterThan(analysisVisits.length);
            }
        });
    });

    it('should define a subset of scheduled visits', () => {
        const loading = setInterval(() => {
            const loadingIndicated = instance.loaded;

            if (loadingIndicated) {
                // Handle loading indicator.
                clearInterval(loading);
                const scheduledVisits = d3
                    .set(
                        data
                            .map(d => d[instance.settings.visit_col])
                            .filter(visit => !instance.settings.visit_exclusion_regex.test(visit))
                    )
                    .values();
                instance.data.filters.find(filter => filter.col === 'subset2').value =
                    'On Treatment';
                filterData.call(instance);
                defineVisitSet.call(instance);
                const analysisVisits = instance.data.sets.scheduledVisits;
                expect(scheduledVisits).toEqual(expect.arrayContaining(analysisVisits));
            }
        });
    });
});
