import './util/polyfills';
import configuration from './configuration/index';
import layout from './layout';
import styles from './styles';
import controls from './controls';
import listing from './listing/index';
import charts from './charts/index';
import init from './init';

export default function participantVisitListing(element = 'body', settings = {}) {
    //Instantiate central object.
    const pvl = {
        element,
        settings: {
            user: settings,
            rendererSettings: configuration.rendererSettings(),
            controlsSettings: configuration.controlsSettings(),
            listingSettings: configuration.listingSettings(),
            ordinalChartSettings: configuration.ordinalChartSettings(),
            linearChartSettings: configuration.linearChartSettings()
        },
        init
    };

    //Merge and sync user settings with default settings.
    pvl.settings.listingMerged = Object.assign(
        {},
        pvl.settings.listingSettings,
        pvl.settings.rendererSettings,
        pvl.settings.user
    );
    configuration.syncListingSettings.call(pvl);

    pvl.settings.ordinalChartMerged = Object.assign(
        {},
        pvl.settings.ordinalChartSettings,
        pvl.settings.user
    );
    configuration.syncOrdinalChartSettings.call(pvl);

    pvl.settings.linearChartMerged = Object.assign(
        {},
        pvl.settings.linearChartSettings,
        pvl.settings.user
    );
    configuration.syncLinearChartSettings.call(pvl);

    pvl.settings.controlsMerged = Object.assign(
        {},
        pvl.settings.controlsSettings,
        pvl.settings.user
    );
    configuration.syncControlsSettings.call(pvl);

    layout.call(pvl); // attaches containers object to central object ([pvl])
    styles.call(pvl); // attaches styles object to central object ([pvl])
    controls.call(pvl); // attaches Webcharts controls object to central object ([pvl])
    listing.call(pvl); // attaches Webcharts table object to central object ([pvl])
    charts.ordinalChart.call(pvl); // attaches Webcharts chart object to central object ([pvl])
    charts.linearChart.call(pvl); // attaches Webcharts chart object to central object ([pvl])

    return pvl;
}
