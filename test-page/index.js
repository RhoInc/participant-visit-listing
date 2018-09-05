d3.csv(
    'https://rawgit.com/RhoInc/participant-visit-listing/master/test-page/DMV_Visits.csv',
    //'./DMV_Visits.csv', // to improve speed use local data file in development
    function(d) {
        return d;
    },
    function(data) {
        const pvl = participantVisitListing('#container');
        pvl.init(data);
    }
);
