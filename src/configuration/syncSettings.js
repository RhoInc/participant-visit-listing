export default function syncSettings() {
    const settings = this.settings.rendererMerged;

    //Convert visit_exclusion_pattern from string to regular expression.
    if (
        typeof settings.visit_exclusion_pattern === 'string' &&
        settings.visit_exclusion_pattern !== ''
    ) {
        const flags = settings.visit_exclusion_pattern
            .replace(/.*?\/([gimy]*)$/, '$1'); // capture regex flags from end of regex string
        const pattern = settings.visit_exclusion_pattern
            .replace(
                new RegExp('^/(.*?)/' + flags + '$'),
                '$1'
            ); // capture regex pattern from beginning of regex string
        settings.visit_exclusion_regex = new RegExp(pattern, flags);
    }

    //Assign settings to settings object.
    this.settings.rendererSynced = settings;
    Object.assign(this.settings, settings);
}
