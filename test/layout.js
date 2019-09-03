import jsdom from 'jsdom';
import { performance } from 'perf_hooks';
import participantVisitListing from '../src/index.js';
import expect from 'expect';
import d3 from 'd3';
const data = require('./visits.json');

describe('The init method is called.', () => {
    const { JSDOM } = jsdom;
    global.window = (new JSDOM(``, { runScripts: "dangerously" })).window;
    let dom, container, instance;

    before(() => {
        dom = new JSDOM('<!doctype html>');
        container = dom.window.document.createElement('div');
    });

    after(() => {
    });

    afterEach(() => {
        instance.destroy();
    });

    describe('should place each display in individual tabs and default to the Visit Chart tab', () => {
        beforeEach(() => {
            instance = participantVisitListing(container, {exportable: false}, {dom,performance});
            instance.init(data, true);
        });

        it('should have a Visit Chart tab, a Study Day Chart tab, and a Listing tab', () => {
            const tabs = container.querySelectorAll('.pvl-tab');
            expect(Array.from(tabs).map(node => node.innerHTML)).toEqual(['Visit Chart', 'Study Day Chart', 'Listing']);
        });

        it('should set the Visit Chart tab to active', () => {
            const activeTab = container.querySelectorAll('.pvl-tab--active');
            expect(Array.from(activeTab).map(node => node.innerHTML)).toEqual(['Visit Chart']);
        });

        it('should not set the diplay of the Visit Chart to none', () => {
            const loading = setInterval(() => {
                const loadingIndicated = instance.loaded;

                if (loadingIndicated) {
                    // Handle loading indicator.
                    clearInterval(loading);
                    const unhiddenDisplays = instance.containers.main.selectAll('.pvl-display:not(.pvl-hidden)');
                    const nUnhiddenDisplays = unhiddenDisplays.size();
                    expect(nUnhiddenDisplays).toBe(1);
                }
            });
        });

        it('should set the diplay of the Study Day Chart and the Listing to none', () => {
            const loading = setInterval(() => {
                const loadingIndicated = instance.loaded;

                if (loadingIndicated) {
                    // Handle loading indicator.
                    clearInterval(loading);
                    const hiddenDisplays = instance.containers.main.selectAll('.pvl-display.pvl-hidden');
                    const nHiddenDisplays = hiddenDisplays.size();
                    expect(nHiddenDisplays).toBe(2);
                }
            });
        });
    });

    describe('when chart_layout is set to side-by-side, should place charts in a single tab', () => {
        beforeEach(() => {
            instance = participantVisitListing(container, {chart_layout: 'side-by-side', exportable: false}, {dom,performance});
            instance.init(data, true);
        });

        it('should have a Charts tab and a Listing tab', () => {
            const tabs = container.querySelectorAll('.pvl-tab');
            expect(Array.from(tabs).map(node => node.innerHTML)).toEqual(['Charts', 'Listing']);
        });

        it('should set the Charts tab to active', () => {
            const activeTab = container.querySelectorAll('.pvl-tab--active');
            expect(Array.from(activeTab).map(node => node.innerHTML)).toEqual(['Charts']);
        });

        it('should not set the diplay of the Charts to none', () => {
            const loading = setInterval(() => {
                const loadingIndicated = instance.loaded;

                if (loadingIndicated) {
                    // Handle loading indicator.
                    clearInterval(loading);
                    const unhiddenDisplays = instance.containers.main.selectAll('.pvl-charts:not(.pvl-hidden)');
                    const nUnhiddenDisplays = unhiddenDisplays.size();
                    expect(nUnhiddenDisplays).toBe(1);
                }
            });
        });

        it('should set the diplay of the Listing to none', () => {
            const loading = setInterval(() => {
                const loadingIndicated = instance.loaded;

                if (loadingIndicated) {
                    // Handle loading indicator.
                    clearInterval(loading);
                    const hiddenDisplays = instance.containers.main.selectAll('.pvl-display.pvl-hidden');
                    const nHiddenDisplays = hiddenDisplays.size();
                    expect(nHiddenDisplays).toBe(1);
                }
            });
        });
    });
});
