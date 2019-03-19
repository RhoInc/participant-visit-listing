import stringToRegExp from '../util/stringToRegExp';

export default function syncListingSettings() {
    const settings = this.settings.listingMerged;

    //Define regular expressions.
    settings.visit_expectation_regex = stringToRegExp(settings.visit_expectation_pattern);
    settings.visit_exclusion_regex = stringToRegExp(settings.visit_exclusion_pattern);
    settings.visit_overdue_regex = stringToRegExp(settings.visit_overdue_pattern);

    //Check active_tab and chart_layout settings.
    if (['tabbed', 'side-by-side'].indexOf(settings.chart_layout) < 0) {
        console.warn(
            `[ chart_layout ] must be "tabbed" or "side-by-side", not "${
                settings.chart_layout
            }". Defaulting to "tabbed".`
        );
        settings.chart_layout = 'tabbed';
    }

    if (settings.chart_layout === 'tabbed') {
        if (['Visit Chart', 'Study Day Chart', 'Listing'].indexOf(settings.active_tab) < 0) {
            console.warn(
                `[ active_tab ] must be "Visit Chart", "Study Day Chart", or "Listing", not "${
                    settings.active_tab
                }". Defaulting to "Visit Chart".`
            );
            settings.active_tab = 'Visit Chart';
        }
    } else if (settings.chart_layout === 'side-by-side') {
        if (['Charts', 'Listing'].indexOf(settings.active_tab) < 0) {
            console.warn(
                `[ active_tab ] must be "Charts" or "Listing", not "${
                    settings.active_tab
                }". Defaulting to "Charts".`
            );
            settings.active_tab = 'Charts';
        }
    }

    //Assign settings to settings object.
    this.settings.listingSynced = settings;
    Object.assign(this.settings, settings);
}
