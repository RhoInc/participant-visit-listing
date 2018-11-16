export default function listingSettings() {
    const exports = ['csv'];
    if (window.XLSX) exports.unshift('xlsx');
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
        visit_text_color_col: 'visit_text_color', // must be hex RGB
        visit_status_description_col: 'visit_status_description',
        visit_expectation_pattern: '/expect|future|overdue/i',
        visit_exclusion_pattern: '/unscheduled|early termination|repeat/i',
        visit_status_exclusion_col: 'plot_exclude',
        visit_status_exclusion_value: 'Yes',

        //Miscellaneous
        active_tab: 'Charts', // ['Listing', 'Ordinal', 'Linear']
        date_format: '%Y-%m-%d', // format of visit dates
        display_cell_text: false,
        chart_margin: {
            top: 100,
            bottom: 100
        },
        filter_cols: ['subset1', 'subset2', 'subset3', 'overdue2'], // default filter variables
        pagination: false, // turn off pagination to view all IDs at the same time
        exports // default exports are to .xlsx and .csv
    };
}
