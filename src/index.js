import './util/polyfills';
import configuration from './configuration/index';
import layout from './layout';
import styles from './styles';
import controls from './controls';
import listing from './listing/index';
import chart from './chart/index';
import init from './init';

export default function participantVisitListing(element, settings = {}) {
    //Instantiate central object.
    const pvl = {
        element,
        settings: {
            user: settings,
            controlsSettings: configuration.controlsSettings(),
            listingSettings: configuration.listingSettings(),
            chartSettings: configuration.chartSettings(),
        },
        init
    };

    //Merge and sync user settings with default settings.
    pvl.settings.listingMerged = Object.assign({},
        pvl.settings.listingSettings,
        pvl.settings.user,
    );
    pvl.settings.chartMerged = Object.assign({},
        pvl.settings.chartSettings,
        pvl.settings.user,
    );
    pvl.settings.controlsMerged = Object.assign({},
        pvl.settings.controlsSettings,
        pvl.settings.user,
    );
    configuration.syncListingSettings.call(pvl);
    configuration.syncChartSettings.call(pvl);
    configuration.syncControlsSettings.call(pvl);

    layout.call(pvl); // attaches containers object to central object ([pvl])
    styles.call(pvl); // attaches styles object to central object ([pvl])
    controls.call(pvl); // attaches Webcharts controls object to central object ([pvl])
    listing.call(pvl); // attaches Webcharts table object to central object ([pvl])
    chart.call(pvl); // attaches Webcharts chart object to central object ([pvl])

    return pvl;
}
