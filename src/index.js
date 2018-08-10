import './util/polyfills';
import configuration from './configuration/index';
import layout from './layout';
import styles from './styles';
import controls from './controls';
import listing from './listing/index';
import init from './init';

export default function participantVisitListing(element, settings = {}) {
    //Instantiate central object.
    const pvl = {
        element,
        settings: {
            user: settings,
            renderer: configuration.rendererSettings(),
            controls: configuration.controlsSettings()
        },
        init
    };

    //Merge and sync user settings with default settings.
    pvl.settings.rendererMerged = Object.assign(pvl.settings.renderer, pvl.settings.user);
    configuration.syncSettings.call(pvl);
    configuration.syncControls.call(pvl);

    layout.call(pvl); // attaches containers object to central object ([pvl])
    styles.call(pvl); // attaches styles object to central object ([pvl])
    controls.call(pvl); // attaches Webcharts controls object to central object ([pvl])
    listing.call(pvl); // attaches Webcharts table object to central object ([pvl])

    return pvl;
}
