export default function listingSettings() {
    return {
        //ID-level variables
        site_col: 'site_name',
        id_col: 'subjectnameoridentifier',
        id_status_col: 'subject_status',

        //Visit-level variables
        visit_col: 'visit_name',
        visit_order_col: 'visit_number',
        visit_date_col: 'visit_date',
        visit_day_col: 'visit_day',
        visit_status_col: 'visit_status',
        visit_status_order_col: 'visit_status_order',
        visit_text_col: 'visit_text',
        visit_text_color_col: 'visit_status_color', // must be hex RGB
        visit_status_description_col: 'visit_status_description',
        visit_exclusion_pattern: '/unscheduled|early termination|repeat/i',
        visit_status_exclusion_col: 'plot_exclude',
        visit_status_exclusion_value: 'Yes',

        //Miscellaneous
        date_format: '%Y-%m-%d', // format of visit dates
        filter_cols: ['subset1', 'subset2', 'subset3', 'overdue2'], // default filter variables
        pagination: false, // turn off pagination to view all IDs at the same time
        exports: ['xlsx', 'csv'] // default exports are to .xlsx and .csv
    };
}
