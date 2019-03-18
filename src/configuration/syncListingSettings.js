export default function syncListingSettings() {
    const settings = this.settings.listingMerged;

    //Convert visit_expectation_pattern from string to regular expression.
    if (
        typeof settings.visit_expectation_pattern === 'string' &&
        settings.visit_expectation_pattern !== ''
    ) {
        const flags = settings.visit_expectation_pattern.replace(/.*?\/([gimy]*)$/, '$1'); // capture regex flags from end of regex string
        const pattern = settings.visit_expectation_pattern.replace(
            new RegExp('^/(.*?)/' + flags + '$'),
            '$1'
        ); // capture regex pattern from beginning of regex string
        settings.visit_expectation_regex = new RegExp(pattern, flags);
    }

    //Convert visit_exclusion_pattern from string to regular expression.
    if (
        typeof settings.visit_exclusion_pattern === 'string' &&
        settings.visit_exclusion_pattern !== ''
    ) {
        const flags = settings.visit_exclusion_pattern.replace(/.*?\/([gimy]*)$/, '$1'); // capture regex flags from end of regex string
        const pattern = settings.visit_exclusion_pattern.replace(
            new RegExp('^/(.*?)/' + flags + '$'),
            '$1'
        ); // capture regex pattern from beginning of regex string
        settings.visit_exclusion_regex = new RegExp(pattern, flags);
    }

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
