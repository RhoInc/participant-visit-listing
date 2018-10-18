d3.csv(
    './DMV_Visits.csv',
    function(d) {
        return d;
    },
    function(data) {
        const pvl = participantVisitListing('#container');
        pvl.init(data);
    }
);
