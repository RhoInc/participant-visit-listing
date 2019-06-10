d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/visits.csv',
    function(d,i) {
        return d;
    },
    function(data) {
        const instance = participantVisitListing(
            '#container', // element
            {
                active_tab: 'Listing',
            } // settings
        );
        instance.init(data);
    }
);
