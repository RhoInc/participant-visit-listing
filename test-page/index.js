d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/visits.csv',
    function(d,i) {
        return d;
    },
    function(data) {
        const instance = participantVisitListing(
            '#container', // element
            {
                chart_layout: 'side-by-side',
            } // settings
        );
        instance.init(data);
    }
);
