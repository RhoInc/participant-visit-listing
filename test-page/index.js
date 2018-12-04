d3.csv(
    //'https://raw.githubusercontent.com/RhoInc/viz-library/master/data/dataCleaning/visits/dmv_Visits.csv',
    '../../viz-library/data/dataCleaning/visits/dmv_Visits.csv',
    function(d) {
        return d;
    },
    function(data) {
        const pvl = participantVisitListing(
            '#container',
            {
                active_tab: 'Charts',
            }
        );
        pvl.init(data);
    }
);
