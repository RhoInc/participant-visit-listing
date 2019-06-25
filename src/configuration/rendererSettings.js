export default function rendererSettings() {
    return {
        //ID-level variables
        site_col: 'site_name',
        id_col: 'subjectnameoridentifier',
        id_status_col: 'subject_status',

        //Visit-level variables
        visit_col: 'visit_name',
        visit_abbreviation_col: 'visit_abbreviation',
        visit_order_col: 'visit_number',
        visit_date_col: 'visit_date',
        visit_day_col: 'visit_day',
        visit_status_col: 'visit_status',
        visit_status_order_col: 'visit_status_order',
        visit_text_col: 'visit_text',
        visit_status_color_col: 'visit_status_color', // must be hex RGB
        visit_status_description_col: 'visit_status_description',
        visit_expectation_pattern: '/expect|future|overdue/i',
        visit_exclusion_pattern: '/unscheduled|early termination|repeat/i',
        visit_overdue_pattern: '/overdue/i',
        visit_status_exclusion_col: 'plot_exclude',
        visit_status_exclusion_value: 'Yes',

        //Miscellaneous
        filter_cols: ['subset1', 'subset2', 'subset3'], // default filter variables
        chart_layout: 'tabbed', // ['tabbed', 'side-by-side']
        active_tab: 'Visit Chart', // ['Visit Chart', 'Study Day Chart', 'Listing', 'Charts']
        abbreviate_visits: true,
        chart_margin: {
            top: 100,
            bottom: 100
        },
        display_cell_text: true,
        toggle_cell_text: false,
        date_format: '%Y-%m-%d' // format of visit dates
    };
}
