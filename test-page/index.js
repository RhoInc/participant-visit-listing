d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/visits.csv',
    function(d,i) {
        if (!(i%10)) {
            if (d.visit_status === 'Completed') d.visit_status = 'completador';
            if (d.visit_status === 'Expected') d.visit_status = 'expectedador';
            if (d.visit_status === 'Overdue') d.visit_status = 'overduedeador';
            if (d.visit_status === 'Missed') d.visit_status = 'missedodor';
        }
        return d;
    },
    function(data) {
        const instance = participantVisitListing(
            '#container', // element
            {
            } // settings
        );
        instance.init(data);
    }
);
