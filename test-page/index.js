d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/visits.csv',
    function(d) {
        delete d.overdue2;
        return d;
    },
    function(data) {
        const pvl = participantVisitListing(
            '#container', // element
            {
            } // settings
        );
        pvl.init(data);
    }
);
